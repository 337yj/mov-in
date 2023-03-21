import React from 'react';
import cx from 'classnames';
import styles from './input.module.scss';

const Input = ({ className, label, id, placeholder, ...props }) => {
  return (
    <label htmlFor={id} className={cx(styles.label, className)}>
      {/* 추후 사용시 value속성 추가*/}
      <input
        type="text"
        id={id}
        name={id}
        placeholder={placeholder}
        className={styles.input}
        {...props}
      />
    </label>
  );
};

export default Input;
