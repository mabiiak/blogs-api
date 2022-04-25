const Joi = require('joi');
const services = require('../services/User');

const userSchema = Joi.object({
  password: Joi.string().required(),
  displayName: Joi.string().min(8),
  email: Joi.string().email().required(),
  image: Joi.string(),
});

const user = (req, _res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) throw error;

  next();
};

const mail = async (req, res, next) => {  
  const { email, password } = req.body;
  const checkEmail = await services.findEmail({ email });

  if (password.length < 6) {
    return res.status(400)
      .json({ message: '"password" length must be 6 characters long' });
  }
  // ver como personalizar mensagem de erro Joi e como usar o try/catch/throw

  if (checkEmail !== null) return res.status(409).json({ message: 'User already registered' });

  next();
};

const token = async (req, res, next) => {
  const validateToken = req.headers.authorization;

  if (!validateToken) return res.status(401).json({ message: 'Token not found' });

  if (validateToken.length < 15) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};

module.exports = { user, mail, token };
