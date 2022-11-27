const express = require('express')
const cors = require('cors')
const app = express()
app.use(
  cors({
    origin: "https://hostel26.onrender.com",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
    preflightContinue:true
  })
);
const cookieparser = require('cookie-parser');
app.use(cookieparser());
require('dotenv').config({ path: 'config.env' })
app.use(express.json())
app.use(express.static('public'));
app.use(require('./src/router'))
require('./src/db/conn')


app.listen(process.env.PORT, () => {
  console.log(`listening to the port ${process.env.PORT}`);
})