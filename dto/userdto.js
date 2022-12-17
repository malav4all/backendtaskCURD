class User {
  constructor(firstName, email, phone, dob, profileImage, adharImage) {
    this.firstName = firstName;
    this.email = email;
    this.phone = phone;
    this.dob = dob;
    this.profileImage = profileImage;
    this.adharImage = adharImage;
  }
}

module.exports = User;
