import { emailRegEx, passwordRegEx } from "../../../utils/regex";

export const validateEmail = ( email ) => {
  if (email === "") {
    return "입력해주세요.";
  }

  if (!emailRegEx.test(email)) {
    return "정확한 이메일 주소를 입력해주세요.";
  }

  return true;
};

export const validatePassword = (password) => {
  if (password === ""){
    return "입력해주세요.";
  }

  if (!passwordRegEx.test(password)) {
    return "올바른 비밀번호를 입력해주세요."; 
  }

  return true;
};