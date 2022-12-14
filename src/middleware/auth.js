const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.body.token;
    jwt.verify(token, process.env.SECRET_KEY);
      next();
  } catch (error) {
    res.status(500);
    next()
  }
}

module.exports = auth