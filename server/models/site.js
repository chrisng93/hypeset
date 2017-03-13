module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define('Site', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUrl: true,
      },
    },
  }, {
    classMethods: {
      associate: (m) => {
        Site.hasMany(m.Info);
      },
    },
  });
  return Site;
};
