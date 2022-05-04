require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const mongoose = require("mongoose");
const subscribersRoute = require('./routes/subscribers')

mongoose.connect(process.env.DATABASE_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection
db.on('error', (err)=> console.log(err))
db.once('open', ()=> console.log('Database Connected'))

app.use(bodyParser.json());
app.use('/subscribers', subscribersRoute)

app.listen(3000, () => console.log("Running"));
