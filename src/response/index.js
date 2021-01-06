const success = (res, response) => {
  return res.status(response.statusCode).json({
    status: response.status,
    data: response.resource
  });
}

const error = (res, response) => {
  return res.status(response.statusCode).json({
    status: response.status,
    message: response.message
  });
}

const successResponseObject = (resource, statusCode = 200) => {
  return { status: true, statusCode, resource };
}

const failureResponseObject = (statusCode, message) => {
  return { status: false, statusCode, message };
}

const serverErrorResponseObject = () => {
  return {
    status: false,
    statusCode: 500,
    message: 'Unable to perform this action at this time. Try again later.'
  };
}

const httpResponse = (res, response) => {
  if (response.status) {
    return success(res, response);
  }
  return error(res, response);
}

export default {
  httpResponse,
  successResponseObject,
  failureResponseObject,
  serverErrorResponseObject
};