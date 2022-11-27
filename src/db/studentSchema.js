const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const studentSchema = new mongoose.Schema({
  name: String,
  branch: String,
  section:String,
  city: String,
  mobile: String,
  room: Number,
  floor:String,
  password: String,
  profilePic: String,
  tokens: [
    {
      token: {
        type: String,
        required:true
      }
   }
  ]
})

studentSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashed_password = await bcrypt.hash(this.password, 12);
    this.password = hashed_password;
  }
  next();
})

studentSchema.methods.generateAuthToken = async function () {
   try {
     const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
     this.tokens = this.tokens.concat({ token: token });
     await this.save();
     return token;
   } catch (error) {
      console.log(error);
   }
}

const Student = new mongoose.model('student', studentSchema);


module.exports = Student