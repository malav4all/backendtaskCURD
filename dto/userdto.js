class User {
  constructor(firstName, phone, email, dob, profileImage, adharImage) {
    this.firstName = firstName;
    this.email = email;
    this.phone = phone;
    this.dob = dob;
    this.profileImage = profileImage;
    this.adharImage = adharImage;
  }
}

module.exports = User;
