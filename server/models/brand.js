module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Brand.belongsToMany(models.User, { through: models.UserBrand, foreignKey: 'username' });
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
