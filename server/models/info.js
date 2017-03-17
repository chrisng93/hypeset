module.exports = (sequelize, DataTypes) => {
  const TYPES = ['News', 'Sale'];

  const Info = sequelize.define('Info', {
    type: {
      type: DataTypes.ENUM,
      values: TYPES,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
      unique: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blurb: {
      type: DataTypes.STRING,
    },
    imgUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    SiteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (m) => {
        Info.belongsToMany(m.Brand, { through: 'InfoBrand', foreignKey: 'InfoId' });
        Info.belongsToMany(m.User, { through: 'InfoUser', foreignKey: 'InfoId' });
        Info.belongsTo(m.Site);
      },
      updateOrCreate: function(article, type) {
        return this.find({ where: { url: article.url } })
          .then((info) => {
            if (info) {
              return info.update({ ...article, type });
            }
            return this.create({ ...article, type });
          });
      },
    },
  });
  return Info;
};
