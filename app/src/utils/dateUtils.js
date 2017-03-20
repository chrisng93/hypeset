/**
 * Created by chrisng on 3/19/17.
 */
import moment from 'moment';

const readableDate = (date) => {
  return moment(date, 'YYYY-MM-DD').format('MMMM Do, YYYY');
};

export const formatDates = (array) => {
  return array.map((item) => {
    if (item.date) {
      item.date = readableDate(item.date);
    }
    return item;
  });
};
