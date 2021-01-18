import response  from '../response';
import { auth } from '../firebase';

const tokenAuthentication = async (req, res, next) => {
  // get option to the request headers
  const bearerHeader = req.get('authorization');
  if (!bearerHeader) {
    return response.error(res, 'No token provided', 401);
  }

  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];

  try {
    const decodedToken = await auth.verifyIdToken(bearerToken);

    req.uid = decodedToken.uid;
    return next()
  } catch (error) {
    return response.error(res, 'Error authenticating, please login again', 401);
  }

}

export default tokenAuthentication;
