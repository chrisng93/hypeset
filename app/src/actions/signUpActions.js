/**
 * Created by chrisng on 3/12/17.
 */

export default function signUp(payload) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  };
  fetch(`${process.env.API_URL}/api/user`, options)
    .then(response => response.json())
    .then((json) => {
      console.log(json)
    })
    .catch(err => console.error(`Error signing up user: ${err}`));
}
