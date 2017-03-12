/**
 * Created by chrisng on 3/11/17.
 */
import * as actionTypes from '../constants/actionTypes.js';

export default function auth(payload) {
  console.log(payload)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  console.log(`${process.env.API_URL}/auth`)
  fetch(`${process.env.API_URL}/auth`, options)
    .then(response => response.json())
    .then((json) => {
      console.log(json)
    })
    .catch(err => console.error(`Error authenticating user: ${err}`));
}
