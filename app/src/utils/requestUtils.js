/**
 * Created by chrisng on 3/14/17.
 */

function createHeaders(token) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

// TODO: create generic request with url and options inputs

module.exports = { createHeaders };
