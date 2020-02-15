const Joi = require("@hapi/joi");

const loginSchema: any = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const signupSchema: any = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  verifyPassword: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  accountType: Joi.string().required()
});

export const verifyLogin = (req, res, next) => {
  const body: any = req.body;
  const { result, error }: any = loginSchema.validate(body);
  error ? res.json(error.details.map(detail => detail.message)) : next();
};

export const verifySignup = (req, res, next) => {
  const body: any = req.body;
  const { result, error }: any = signupSchema.validate(body);
  error ? res.json(error.details.map(detail => detail.message)) : next();
};
