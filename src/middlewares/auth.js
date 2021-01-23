import response  from '../response';
import { auth } from '../config/firebase';

const tokenAuthentication = async (req, res, next) => {
  // get option to the request headers
  const bearerHeader = req.get('authorization');
  if (!bearerHeader) {
    return response.unauthorized(res, 'No token provided');
  }

  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];

  try {
    const decodedToken = await auth.verifyIdToken(bearerToken);

    req.uid = decodedToken.uid;
    return next()
  } catch (error) {
    return response.unauthorized(res, 'Error authenticating, please login again');
  }

}

export default tokenAuthentication;
