/**
 * Created by chrisng on 3/14/17.
 */
import m from '../models';

export const isUnique = (modelName, field) => {
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

export const isMoreThanXChars = (field, x) => {
  return (value, next) => {
    if (value.length < x) {
      return next(`${field} must be more than ${x} characters`);
    }
    return next();
  };
};
