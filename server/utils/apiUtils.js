/**
 * Created by chrisng on 3/25/17.
 */

export const checkForSequelizeErrors = (err) => {
  let message;
  (err.name && err.name.slice(0, 9) === 'Sequelize') ? message = err.errors[0].message : message = err.message;
  return message;
};
