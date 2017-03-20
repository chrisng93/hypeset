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
      findByName: function(name) {
        return this.find({ attributes: { exclude: ['createdAt', 'updatedAt'] }, where: { name } });
      },
    },
  });
  return Site;
};
