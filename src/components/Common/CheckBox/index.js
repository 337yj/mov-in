import React, { memo } from "react";
import cx from "classnames";
import { IconCheck } from "../../../assets";
import styles from "./checkBox.module.scss";

const CheckBox = ({ className, ...props }) => {
  return (
    <label className={cx(styles.wrapper, className)}>
      <input type="checkbox" readOnly hidden {...props} />
      <IconCheck />
    </label>
  );
};

export default memo(CheckBox);
