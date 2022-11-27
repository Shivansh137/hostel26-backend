const mongoose = require('mongoose')
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => { console.log('connented to the Database'); }).catch((error) => { console.log(error); })
