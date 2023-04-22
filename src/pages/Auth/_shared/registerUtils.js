import { isValidateEmail } from "../../../utils";

export const validateForm = (form) => {
  const errors = {};
  if (!form.email) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!isValidateEmail(form.email)) {
    errors.email = "유효한 이메일을 입력해주세요.";
  }
  if (!form.password) {
    errors.password = "비밀번호를 입력해주세요.";
  } else if (form.password.length < 8) {
    errors.password = "비밀번호는 8자 이상이어야 합니다.";
  }
  if (!form.passwordConfirm) {
    errors.passwordConfirm = "비밀번호 확인을 입력해주세요.";
  } else if (form.password !== form.passwordConfirm) {
    errors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
  }
  if (!form.name) {
    errors.name = "이름을 입력해주세요.";
  }
  if (!form.birth) {
    errors.birth = "생년월일 6자를 입력해주세요.";
  }
  if (!form.nickname) {
    errors.nickname = "닉네임을 입력해주세요.";
  }
  return errors;
};
