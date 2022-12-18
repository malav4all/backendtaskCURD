/**
 * Maintain DB Connection With Mongo Atlas With PoolSize
 * @author Malav Naagar
 * @copyright ABC
 * @version 1.0
 * @summary Connection File
 */

const mongoose = require('mongoose');
const dbOptions = {
  useNewUrlParser: true,
};
mongoose.connect('mongodb://localhost:27017/user', dbOptions, (err) => {
  if (err) {
    console.log('DB Error', err.message);
  } else {
    console.log('Connected to DB');
  }
});

module.exports = mongoose;
