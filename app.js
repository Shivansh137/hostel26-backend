const express = require('express')
const app = express()
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