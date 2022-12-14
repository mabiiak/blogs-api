const Joi = require('joi');

const errorHandle = (err, _req, res, _next) => {
  if (Joi.isError(err)) return res.status(400).json({ message: err.message });
  // return res.status(500).json({ message: 'Ops, algo deu errado' });
};

module.exports = { errorHandle };
