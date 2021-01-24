import orderService from './ordersService';
import response from '../../response';


/**
 * Create a new order
 *
 * @param {object} req The http request payload sent from the user
 * @param {object} res - The http response payload sent back
 * @param {object} next - The next function to call if validation passes
 *
 * @returns {Object} - error objects if fails or order object if successful
 */
const create = async (req, res) => {
  const result = await orderService.saveOrder(req.body);
  return response.httpResponse(res, result);
}

/**
 * Update an existing order
 *
 * @param {object} req The http request payload sent from the user
 * @param {object} res - The http response payload sent back
 * @param {object} next - The next function to call if validation passes
 *
 * @returns {Object} - error objects if fails or order object if successful
 */
const update = async (req, res) => {
  const result = await orderService.updateOrder(req.params.id, req.body);
  return response.httpResponse(res, result);
}

export default {
  create,
  update
}