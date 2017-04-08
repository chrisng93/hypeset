/**
 * Created by chrisng on 3/25/17.
 */

export const checkForSequelizeErrors = (err) => {
  return (err.name && err.name.slice(0, 9) === 'Sequelize') ? err.errors[0].message : err.message;
};
