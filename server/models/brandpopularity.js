module.exports = (sequelize, DataTypes) => {
  const BrandPopularity = sequelize.define('BrandPopularity', {
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brandName: DataTypes.STRING,
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    classMethods: {
      associate: (m) => {
        BrandPopularity.belongsTo(m.Brand);
      },
    },
  });
  return BrandPopularity;
};
