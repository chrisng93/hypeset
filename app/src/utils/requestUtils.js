/**
 * Created by chrisng on 3/14/17.
 */

export const createHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};
