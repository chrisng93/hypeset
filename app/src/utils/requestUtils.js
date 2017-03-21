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

export const getInfo = (body) => {
  const { url, options, onFetching, onSuccess, onFailure, errorMessage, dispatch } = body;
  dispatch(onFetching());

  return fetch(url, options)
    .then(response => response.json())
    .then((json) => {
      if (!json.success) {
        return dispatch(onFailure(json));
      }
      return dispatch(onSuccess(json));
    })
    .catch((err) => {
      console.error(`${errorMessage}: ${err}`);
      return dispatch(onFailure(err));
    });
};
