import React from "react";
// 참고 : classnames 라이브러리 소개 https://www.npmjs.com/package/classnames
// 참고 : 왜 cx로 쓰이게 되었을까? https://github.com/JedWatson/classnames/issues/157
import cx from "classnames";
import styles from "./toggle.module.scss";

// input에는 다양한 프로퍼티가 있기 때문에 ...props로 받음
const Toggle = ({ className, ...props}) => {
    return (
        // label의 클래스를 조건부로 설정함
            /* 체크박스를 만들어 체크되었을 경우 버튼을 옮김
             * 버튼의 위치를 바꾸면 되기 때문에 체크박스는 숨김
             * 인풋에 그 외의 일은 발생하지 않기 때문에 readonly */
        <label className={cx(styles.wrapper, className)}>
            <input type="checkbox" hidden readOnly {...props} />
            <span role="button" className={styles.button}/>
        </label>
    );
};

export default Toggle;