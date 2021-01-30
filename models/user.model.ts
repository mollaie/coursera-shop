export default class UserModel {
  constructor(
    email: string,
    firstname: string,
    lastname: string,
    mobile: string,
    password: string
  ) {
    this.Email = email;
    this.FirstName = firstname;
    this.LastName = lastname;
    this.Mobile = mobile;
    this.Password = password;
  }

  Email: string;
  FirstName: string;
  LastName: string;
  Mobile: string;
  Password: string;
}
