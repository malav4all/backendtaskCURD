const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const formData = require('express-form-data');
const fileupload = require('express-fileupload');
dotenv.config();
//middleWares
app.use(fileupload());
app.use(cors());

app.use(morgan('dev'));
// app.use(formData.parse());
app.use(express.json());
app.use(express.urlencoded());

// app.use(express.urlencoded({extended: true}));

//Routes
app.use('/', require('./routes/userroutes'));
const server = app.listen(process.env.PORT, () => {
  console.log('Server Initialization Complete', server.address().port);
});
