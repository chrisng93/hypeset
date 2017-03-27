import { isUnique } from '../utils/databaseUtils';
import { condenseAll } from '../utils/scriptUtils';

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
      checkOrCreate: function(name) {
        const condensedName = condenseAll(name).toLowerCase();
        return this.find({ attributes: { include: ['name'], exclude: ['createdAt', 'updatedAt'] }, where: { condensedName: { $iLike: condensedName } } })
          .then((found) => {
            if (found) {
              return found;
            }
            return this.create({ name, condensedName });
          });
      },
    },
  });
  return Brand;
};
