const jwt = require('jsonwebtoken');
const Student = require('../db/studentSchema');

const profileAuth = async (req, res, next) => {
  try {
    const token = req.body.token;
    const student = jwt.verify(token, process.env.SECRET_KEY);
    const studentData = await Student.findOne({ _id: student._id, "tokens.token": token });
    req.studentData = studentData;
      next();
  } catch (error) {
    res.status(500);
    next()
  }
}

module.exports = profileAuth