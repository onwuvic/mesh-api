import orderService from './ordersService';
import response from '../../response';

const create = async (req, res) => {
  try {
    const result = await orderService.saveOrder(req.body);
    return response.success(res, result, 201);
  } catch (error) {
    return response.error(res);
  }
}

const update = async (req, res) => {
  try {
    const result = await orderService.updateOrder(req.params.id, req.body);
    return response.success(res, result);
  } catch (error) {
    return response.error(res);
  }
}

export default {
  create,
  update
}