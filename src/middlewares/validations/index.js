import Ajv from 'ajv';
import ajvKeywords from 'ajv-keywords';
import addFormats from 'ajv-formats';
import response from '../../response';
import createOrderSchema from './schemas/createOrderSchema.json';
import updateOrderSchema from './schemas/updateOrderSchema.json';

const ajValidator = new Ajv({ allErrors: true });
addFormats(ajValidator);
ajvKeywords(ajValidator, ['transform']);

/**
 * Format the error message into user readable message
 *
 * @param {object} req The request payload sent from the user
 * @param {object} res - The response payload sent back
 * @param {object} next - The next function to call if validation passes
 *
 * @returns {Array} - an array of errors
 */
const parseErrors = (validationErrors) => {
  const errors = [];
  validationErrors.forEach((error) => {
    errors.push({
      param: error.params.missingProperty,
      key: error.keyword,
      message: error.message,
      // eslint-disable-next-line func-names
      property: (function () {
        return error.keyword === 'minimum' ? error.dataPath : undefined;
      }())
    });
  });
  return errors;
};

/**
 * Checks if the user input for creating an order is valid
 *
 * @param {object} req The request payload sent from the user
 * @param {object} res - The response payload sent back
 * @param {object} next - The next function to call if validation passes
 *
 * @returns {object} - status Message if validation fails or proceeds to next()
 */
const createOrderInputValidation = (req, res, next) => {
  const validate = ajValidator.compile(createOrderSchema);
  const result = validate(req.body);
  if (!result) {
    const errors = parseErrors(validate.errors);
    return response.badRequest(res, errors);
  }
  return next();
};

/**
 * Checks if the user input for updating an order is valid
 *
 * @param {object} req The request payload sent from the user
 * @param {object} res - The response payload sent back
 * @param {object} next - The next function to call if validation passes
 *
 * @returns {object} - status Message if validation fails or proceeds to next()
 */
const updateOrderInputValidation = (req, res, next) => {
  const validate = ajValidator.compile(updateOrderSchema);
  const result = validate(req.body);
  if (!result) {
    const errors = parseErrors(validate.errors);
    return response.badRequest(res, errors);
  }
  return next();
};

export default {
  createOrderInputValidation,
  updateOrderInputValidation
};
