import React from "react";
import cx from "classnames";
import styles from "./button.module.scss";
import { IconHeartEmpty } from "../../../assets";

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
export default Button;

/* 서림 : 연습했던 거 남겨둘게
import React from "react";
import cx from "classnames";
import styles from "./button.module.scss";

// 버튼의 기본적인 형태만 부모로 삼고 나머지는 자식이 처리함
const Button = ({ className, children, color, ...props}) => {
    return (
        <button className={cx(styles.button, className, styles[color])}
                type="button"
                {...props}>
            {children}
        </button>
    );
};

export default Button;
*/
