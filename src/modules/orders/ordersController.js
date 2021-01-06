import orderService from './ordersService';
import response from '../../response';

const create = async (req, res) => {
  const result = await orderService.saveOrder(req.body);
  return response.httpResponse(res, result);
}

export default {
  create
}