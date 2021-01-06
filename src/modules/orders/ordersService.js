import response from '../../response';

const saveOrder = async (body) => {
  const orders = [];
  try {
    orders.push(body);
    return response.successResponseObject(body, 201);
  } catch (error) {
    return response.serverErrorResponseObject()
  }
}

export default {
  saveOrder
}