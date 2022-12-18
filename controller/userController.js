const UserService = require('../services/userService');
const User = require('../dto/userdto');
const path = require('path');

const register = (req, res) => {
  try {
    const {firstName, email, phone, dob} = req.body;

    //Uploading Profile Image
    const profileImage = req.files.profileImage;
    const profileImageName = req.files.profileImage.name;
    const parent = path.normalize(__dirname + '/..');
    const fullpath = path.join(parent, '/profileImage/');
    profileImage.mv(fullpath + profileImageName, (err) => {
      if (err) {
        res.sendStatus(500);
      }
    });
    //Uploading Aadhar Card Image
    const aadharImage = req.files.aadharImage;
    const imageName = req.files.aadharImage.name;
    const secondPath = path.normalize(__dirname + '/..');
    const fullPathAadharImage = path.join(secondPath, '/addharImage/');
    aadharImage.mv(fullPathAadharImage + imageName, (err) => {
      if (err) {
        res.sendStatus(500);
      }
    });
    const finalData = new User(
      firstName,
      JSON.parse(email),
      JSON.parse(phone),
      dob,
      profileImageName,
      imageName
    );
    const promise = UserService.addUser(finalData);
    promise
      .then((data) => {
        console.log(data);
        res.json({
          message: 'Insert',
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {register};
