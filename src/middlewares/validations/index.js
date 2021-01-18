import ajv from 'ajv';
import ajvKeywords from 'ajv-keywords';
import response from '../../response';
import createOrderSchema from './schemas/createOrderSchema.json';
import updateOrderSchema from './schemas/updateOrderSchema.json';

const ajValidator = new ajv({allErrors: true});
ajvKeywords(ajValidator, ['transform']);

const createOrderInputValidation = (req, res, next) => {
  const validate = ajValidator.compile(createOrderSchema);
  const result = validate(req.body);
  if (!result) {
    const errors = parseErrors(validate.errors);
    return response.error(res, errors, 400);
  }
  return next();
}

const updateOrderInputValidation = (req, res, next) => {
  const validate = ajValidator.compile(updateOrderSchema);
  const result = validate(req.body);
  if (!result) {
    const errors = parseErrors(validate.errors);
    return response.error(res, errors, 400);
  }
  return next();
}

const parseErrors = (validationErrors) => {
  let errors = [];
  validationErrors.forEach(error => {
    errors.push({
      param: error.params["missingProperty"],
      key: error.keyword,
      message: error.message,
      property: (function() {
        return error.keyword === 'minimum' ? error.dataPath : undefined
      })()
    });
  });
  return errors;
}

export default {
  createOrderInputValidation,
  updateOrderInputValidation
}


