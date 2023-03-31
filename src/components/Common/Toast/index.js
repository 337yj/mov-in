import React, { useState, useEffect } from "react";
import cx from "classnames";
import styles from "./toast.module.scss";
import { IconGreenCheck } from "../../../assets/icon";
import { IconClose } from "../../../assets/icon";

const Toast = ({ className, type, children, func, ...props }) => {
  return (
    <>
      <section className={cx(styles.toast, className, styles[type])}>
        <figure className={cx(styles.circle)}>
          <IconGreenCheck />
        </figure>
        {children}
        {/* <button onClick={func}>
              <IconClose />
            </button> */}
      </section>
    </>
  );
};

export default Toast;
