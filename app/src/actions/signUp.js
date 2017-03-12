/**
 * Created by chrisng on 3/12/17.
 */

export default function signUp(payload) {
  console.log(payload)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  fetch(`${process.env.API_URL}/api/user/create`, options)
    .then(response => response.json())
    .then((json) => {
      console.log(json)
    })
    .catch(err => console.error(`Error signing up user: ${err}`));
}
