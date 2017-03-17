import { isUnique } from '../utils/databaseHelpers';

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
  }, {
    classMethods: {
      associate: (m) => {
        Brand.belongsToMany(m.User, { through: 'UserBrand', foreignKey: 'BrandId' });
        Brand.belongsToMany(m.Info, { through: 'InfoBrand', foreignKey: 'BrandId' });
        Brand.hasMany(m.BrandPopularity);
      },
      findById: function(id) {
        return this.find({ where: { id } });
      },
      findByName: function(name) {
        return this.find({ where: { name: { $iLike: name } } });
      },
      checkOrCreate: function(name) {
        return this.find({ where: { name: { $iLike: name } } })
          .then((found) => {
            if (found) {
              return found;
            }
            return this.create({ name });
          });
      },
    },
  });
  return Brand;
};
