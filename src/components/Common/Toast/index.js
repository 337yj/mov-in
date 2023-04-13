import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import cx from "classnames";
import styles from "./toast.module.scss";
import { IconGreenCheck } from "../../../assets/icon";
import { IconClose } from "../../../assets/icon";

const transitionStyle = {
  entering: {
    transform: "translate(-50%, 40px)",
    transition: "transform 1s ease-in-out",
  },

  exiting: {
    transform: "translate(-50%, -100px)",
    transition: "transform 1s ease-in-out",
  },

  exited: {
    transform: "translate(-50%, -100px)",
    transition: "transform 1s ease-in-out",
  },
};

const Toast = ({ className, type, children, func, float, ...props }) => {
  return (
    <CSSTransition in={float} timeout={3000} unmountOnExit>
      {(state) => (
        <section
          style={{ ...transitionStyle[state] }}
          className={cx(styles.toast, className, styles[type])}
        >
          <figure className={cx(styles.circle)}>
            <IconGreenCheck />
          </figure>
          {children}
          {/* <button onClick={func}>
              <IconClose />
            </button> */}
        </section>
      )}
    </CSSTransition>
  );
};

export default Toast;
