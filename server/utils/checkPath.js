/**
 * Created by chrisng on 3/12/17.
 */

export default function checkPath(req, res, next) {
  const nonSecurePaths = ['/auth'];
  const nonSecurePosts = ['/api/user'];

  if (nonSecurePaths.indexOf(req.path) >= 0 || (req.method === 'POST' && nonSecurePosts.indexOf(req.path) >= 0)) {
    req.unsecured = true;
    return next();
  }
  return next();
}
