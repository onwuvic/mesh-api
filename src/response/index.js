const SERVER_ERROR_MESSAGE = 'Unable to perform this action at this time. Try again later.';

const success = (res, resource, statusCode = 200) => {
  return res.status(statusCode).json({
    status: true,
    data: resource
  });
}

const error = (res, message = SERVER_ERROR_MESSAGE, statusCode = 500) => {
  return res.status(statusCode).json({
    status: false,
    message
  });
}

export default {
  success,
  error
};