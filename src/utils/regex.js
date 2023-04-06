export const isValidateEmail = (email) => {
  const emailReg =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  if (!emailReg.test(email)) {
    return false;
  }
  return true;
};

//영문,숫자,특수문자(!@$%^&* 만 허용)를 조합하여 8~12자로 구성
export const isValidatePassword = (password) => {
  const passwordReg =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,12}$/;

  if (!passwordReg.test(password)) {
    return false;
  }
  return true;
};
