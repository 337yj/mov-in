import React, { memo } from "react";
import cx from "classnames";
import styles from "./button.module.scss";

const Button = ({ className, color, children, ...props }) => {
  return (
    <button
      className={cx(styles.button, className, styles[color])}
      type="submit"
      {...props}
    >
      {children}
    </button>
  );
};
export default memo(Button);
