import orderService from './ordersService';
import response from '../../response';

const create = async (req, res) => {
  const result = await orderService.saveOrder(req.body);
  return response.httpResponse(res, result);
}

const update = async (req, res) => {
  const result = await orderService.updateOrder(req.params.id, req.body);
  return response.httpResponse(res, result);
}

export default {
  create,
  update
}