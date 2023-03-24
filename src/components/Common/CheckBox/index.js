import React from "react";
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

export default CheckBox;

/* 서림 : 연습했던 거 남겨둘게
import React from "react";
import cx from "classnames";
import { IconCheck } from "../../../assets";
import styles from "./checkBox.module.scss";

const CheckBox = ({ className, ...props }) => {
  <label className={cx(styles.wrapper, className)}>
    <input type="checkbox" hidden readOnly {...props} />
    <IconCheck />
  </label>
};

export default CheckBox; */
