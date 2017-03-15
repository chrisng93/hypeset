/**
 * Created by chrisng on 3/14/17.
 */
import m from '../models';

const isUnique = (modelName, field) => {
  return (value, next) => {
    const query = {};
    const model = m[modelName];
    query[field] = value;
    model.find({ where: query, attributes: ['id'] })
      .then((obj) => {
        if (obj) {
          return next(`${modelName} ${field} ${value} is already in use`);
        }
        return next();
      });
  };
};

module.exports = { isUnique };
