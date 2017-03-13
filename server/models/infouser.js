module.exports = (sequelize, DataTypes) => {
  const InfoUser = sequelize.define('InfoUser', {
    infoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
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
  return InfoUser;
};
