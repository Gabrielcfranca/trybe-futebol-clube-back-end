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

const emptyEmail = {
  password: "userteste2",
}

const emptyPassword = {
  email: "testeemail@teste.com"
}

export { 
  mockLogin,
  mockUserValid,
  mockEmailInvalid,
  mockPasswordInvalid,
  emptyEmail,
  emptyPassword,
};