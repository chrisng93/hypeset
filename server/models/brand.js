module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (m) => {
        Brand.belongsToMany(m.User, { through: 'UserBrand', foreignKey: 'brandId' });
        Brand.belongsToMany(m.Info, { through: 'InfoBrand', foreignKey: 'brandId' });
      },
      findById: function(id) {
        return this.find({ where: { id } });
      },
      findByName: function(name) {
        return this.find({ where: { name } });
      },
    },
  });
  return Brand;
};
