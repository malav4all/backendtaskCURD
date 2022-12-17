/**
 * Maintain User Schema
 * @author Malav Naagar
 * @copyright ABC
 * @version 1.0
 * @summary User Schema File
 */

const connection = require('../connect');
const {Schema} = require('mongoose');
const UserSchema = new Schema(
  {
    firstName: {
      type: Schema.Types.String,
      required: true,
    },
    email: {type: Schema.Types.Array, required: true},
    phone: {type: Schema.Types.Array, required: true},
    profileImage: {
      type: Schema.Types.String,
    },
    adharImage: {
      type: Schema.Types.String,
    },
  },
  {timestamps: true}
);

const UserModel = connection.model('users', UserSchema);
module.exports = UserModel;
