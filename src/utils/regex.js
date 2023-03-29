// utils 파일 : 정규표현식 패턴이나 공통 함수 등 공통으로 사용하는 유틸 파일을 구분해둠
// regEx = regular expression
export const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
// 대문자, 소문자, 숫자, 8~20자리 수
export const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;