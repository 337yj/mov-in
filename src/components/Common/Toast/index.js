import React, {useState, useEffect} from "react";
import cx from "classnames";
import styles from "./toast.module.scss";
import {IconGreenCheck} from "../../../assets/icon";
import {IconClose} from "../../../assets/icon";

const Toast = ({className, type, ...props}) => {
  const [toastFloat, setToastFloat] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const msgList = {
    logout: "로그아웃 되었습니다",
    copy: "링크가 복사 되었습니다",
    mveDel: "영화가 삭제 되었습니다",
    cmtDel: "코멘트가 삭제 되었습니다",
    mbrDel: "회원 탈퇴 되었습니다",
    //report : "신고 처리 되었습니다",
    //ignore : "무시 처리 되었습니다",
  };

  const toast = (msg) => {
    if (!toastFloat) {
      setToastFloat(true);
      setToastMsg(msgList[msg]);
    }
  };

  const onCloseToast = () => {
    setToastFloat(!toastFloat);
  };

  useEffect(() => {
    if (toastFloat) {
      setTimeout(() => {
        setToastFloat(false);
        setToastMsg("");
      }, 2000);
    }
  }, [toastFloat]);

  return (
    <>
      <button onClick={() => toast("logout")}>로그아웃버튼</button>
      {toastFloat && (
          <section className={cx(styles.toast, className, styles[type])}>
            <figure className={cx(styles.circle)}>
              <IconGreenCheck />
            </figure>
            {toastMsg}
            <button onClick={onCloseToast}>
              <IconClose />
            </button>
          </section>
      )}
    </>
  );
};

export default Toast;
