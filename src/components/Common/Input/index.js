import React, { memo } from "react";
import cx from "classnames";
import styles from "./input.module.scss";

// 로그인, 회원가입 input
// form태그로 감싸주고 Input 사용하기
const Input = ({ className, label, errorText, onChange, ...props }) => {
  return (
    // label이 input을 감싸고 있을 땐 htmlFor안써줘도 됨
    <label
      className={cx(styles.label, className, { [styles.error]: errorText })}
    >
      {label && <p className={styles.labelText}>{label}</p>}
      <input className={styles.input} onChange={onChange} {...props} />
      {errorText && <p className={styles.errorText}>{errorText}</p>}
    </label>
  );
};

export default memo(Input);
