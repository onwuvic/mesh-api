import response  from '../response';
import { firebase } from '../config/firebase';

/**
 * Checks if the token is provided and if so, whether it is valid
 *
 * @param {object} req The request payload sent from the user
 * @param {object} res - The response payload sent back
 * @param {object} next - The next function to call if validation passes
 *
 * @returns {Object} - unauthorized error or proceeds to next()
 */
const tokenAuthentication = async (req, res, next) => {
  // get option to the request headers
  const bearerHeader = req.get('authorization');
  if (!bearerHeader) {
    return response.unauthorized(res, 'No token provided');
  }

  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];

  try {
    const decodedToken = await firebase.auth().verifyIdToken(bearerToken);

    req.uid = decodedToken.uid;
    return next()
  } catch (error) {
    return response.unauthorized(res, 'Error authenticating, please login again');
  }

}

export default tokenAuthentication;
