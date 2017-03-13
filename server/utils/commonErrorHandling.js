/**
 * Created by chrisng on 3/12/17.
 */

function sendCrudError(type, err, res) {
  // TODO: better messages for error
  console.error(`Error ${type} brand: ${JSON.stringify(err)}`);
  res.status(500).send({ success: false, message: JSON.stringify(err) });
}

module.exports = { sendCrudError };
