import orderService from './ordersService';
import response from '../../response';


/**
 * Create a new order
 *
 * @param {object} req The http request payload sent from the user
 * @param {object} res - The http response payload sent back
 *
 * @returns {Object} - error objects if fails or order object if successful
 */
const create = async (req, res) => {
  const result = await orderService.saveOrder(req.body);
  return response.httpResponse(res, result);
}

/**
 * Create a new order
 *
 * @param {object} req The http request payload sent from the user
 * @param {object} res - The http response payload sent back
 *
 * @returns {Object} - error objects if fails or order object if successful
 */
const getAll = async (req, res) => {
  const result = await orderService.findAll();
  return response.httpResponse(res, result);
}

/**
 * Update an existing order
 *
 * @param {object} req The http request payload sent from the user
 * @param {object} res - The http response payload sent back
 *
 * @returns {Object} - error objects if fails or order object if successful
 */
const update = async (req, res) => {
  const result = await orderService.updateOrder(req.params.id, req.body);
  return response.httpResponse(res, result);
}

export default {
  create,
  update,
  getAll
}