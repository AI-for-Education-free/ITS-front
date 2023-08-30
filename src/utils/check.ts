function checkName(name: string): boolean {
  let re = /^[a-zA-z][a-zA-z ]{1,8}[a-zA-z]$/;
  return re.test(name);
}

function checkPassword(password: string): boolean {
  let re1 = /^[a-zA-Z]\w{7,15}/;
  let re2 = /\d/;
  return re1.test(password) && re2.test(password);
}

function checkEmail(email: string): boolean {
  let re = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return re.test(email);
}


export {
  checkName,
  checkPassword,
  checkEmail
};