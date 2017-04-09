/**
 * Define InfoUser join table
 */

module.exports = (sequelize, DataTypes) => {
  const InfoUser = sequelize.define('InfoUser', {
    InfoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UserId: {
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
