/**
 * Created by chrisng on 3/12/17.
 */

export const sendError = (message, err, res) => {
  // TODO: better messages for error
  console.error(`Error ${message}: ${JSON.stringify(err)}`);
  res.status(500).send({ success: false, message: JSON.stringify(err) });
};
