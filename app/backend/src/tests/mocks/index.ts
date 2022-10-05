import * as bcrypt from 'bcryptjs';

const mockLogin = {
  email: "testeemmail@teste.com",
  password: bcrypt.hashSync("userteste2"),
    // senha: secret_admin
}

const mockUserValid = {
  email: "testeemmail@teste.com",
  password: "userteste2",
}

const mockEmailInvalid = {
  email: "Qualqueremail",
  password: "userteste2",
}

const mockPasswordInvalid = {
  email: "testeemail@teste.com",
  password: "adsl;kfh",
}

export { mockLogin, mockUserValid, mockEmailInvalid, mockPasswordInvalid };