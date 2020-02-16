const Joi = require("@hapi/joi");

const loginSchema: any = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const signupSchema: any = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  verifyPassword: Joi.ref("password"),
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
