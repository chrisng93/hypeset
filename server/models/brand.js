import { isUnique } from '../utils/databaseUtils';
import { condenseAll } from '../utils/scriptUtils';
import { retrieveNews } from '../scripts/news/retrieveNews';
import { retrieveSales } from '../scripts/sales/retrieveSales';
import { setRedisKeys } from '../utils/redisUtils';

module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isUnique: isUnique('Brand', 'name'),
      },
    },
    condensedName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (m) => {
        Brand.belongsToMany(m.User, { through: 'UserBrand', foreignKey: 'BrandId', onDelete: 'CASCADE' });
        Brand.belongsToMany(m.Info, { through: 'InfoBrand', foreignKey: 'BrandId', onDelete: 'CASCADE' });
        Brand.hasMany(m.BrandPopularity, { onDelete: 'SET NULL' });
      },
      findById: function(id) {
        return this.find({ attributes: { include: ['name'], exclude: ['createdAt', 'updatedAt'] }, where: { id } });
      },
      findByName: function(name) {
        return this.find({ attributes: { include: ['name'], exclude: ['createdAt', 'updatedAt'] }, where: { name: { $iLike: name } } });
      },
      checkOrCreate: function(name, isNew = false) {
        const condensedName = condenseAll(name).toLowerCase();
        return this.find({ attributes: { include: ['name'], exclude: ['createdAt', 'updatedAt'] }, where: { condensedName } })
          .then((found) => {
            if (found) {
              return found;
            }
            let brand;
            if (isNew) {
              brand = this.create({ name, condensedName });
              retrieveNews([name], true);
              retrieveSales([name], true);
              setRedisKeys();
            }
            return brand;
          });
      },
    },
  });
  return Brand;
};
