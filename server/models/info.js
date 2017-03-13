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
    siteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (m) => {
        Info.belongsToMany(m.Brand, { through: 'InfoBrand', foreignKey: 'infoId' });
        Info.belongsToMany(m.User, { through: 'InfoUser', foreignKey: 'infoId' });
        Info.belongsTo(m.Site);
      },
      findNews: function() {
        return this.find({ where: { type: TYPES[0] } });
      },
      findSales: function() {
        return this.find({ where: { type: TYPES[1] } });
      }
    },
  });
  return Info;
};
