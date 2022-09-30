import * as Joi from 'joi';

const REQUIRED_FIELD = 'Some required fields are missing';
const MIN_LENGTH = '{#label} length must be at least {#limit} characters long';
// const CATEGORY_NAME_MISSING = '{#label} is required';

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': REQUIRED_FIELD,
    'string.empty': REQUIRED_FIELD,
  }),
  password: Joi.string().min(6).messages({
    'any.required': REQUIRED_FIELD,
    'string.empty': REQUIRED_FIELD,
    'string.min': MIN_LENGTH,
  }),
});

export default { loginSchema };
