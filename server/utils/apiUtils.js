/**
 * Utility functions for APIs
 */

export const checkForSequelizeErrors = (err) => {
  return (err.name && err.name.slice(0, 9) === 'Sequelize') ? err.errors[0].message : err.message;
};
