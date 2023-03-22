import React, {useState, useEffect} from "react";
import cx from "classnames";
import styles from "./toast.module.scss";
import {IconClose} from "../../../assets/icon";
import {IconGreenCheck} from "../../../assets/icon";

const Toast = ({className, type, ...props}) => {
  const [showToast, setShowToast] = useState(true);
  const onClickClose = () => {
    setShowToast(!showToast);
  };

  return (
    <div className={cx(styles.toast, className, styles[type])}>
      <div className={cx(styles.circle)}>
        <IconGreenCheck />
      </div>
      <button onClick={onClickClose}>
        <IconClose />
      </button>
    </div>
  );
};

export default Toast;
