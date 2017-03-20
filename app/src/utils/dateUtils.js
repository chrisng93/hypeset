/**
 * Created by chrisng on 3/19/17.
 */
import moment from 'moment';

export const readableDate = (date) => {
  return moment(date, 'MM-DD-YYYY')
};
