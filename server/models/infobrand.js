/**
 * Define InfoBrand join table
 */

module.exports = (sequelize, DataTypes) => {
  const InfoBrand = sequelize.define('InfoBrand', {
    InfoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    BrandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (m) => {
        // associations can be defined here
      },
    },
  });
  return InfoBrand;
};
