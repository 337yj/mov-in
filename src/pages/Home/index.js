import React, {useState, useEffect} from "react";
import {Toast, CheckBox} from "../../components";
import {Footer} from "../../components/Layout";
import styles from "./home.module.scss";

const Home = () => {
  const msgList = {
    logout: "로그아웃 되었습니다",
    copy: "링크가 복사 되었습니다",
    mveDel: "영화가 삭제 되었습니다",
    cmtDel: "코멘트가 삭제 되었습니다",
    mbrDel: "회원 탈퇴 되었습니다",
    //report : "신고 처리 되었습니다",
    //ignore : "무시 처리 되었습니다",
  };

  const [toastFloat, setToastFloat] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const toast = (msg) => {
    if (!toastFloat) {
      setToastFloat(true);
      setToastMsg(msgList[msg]);
    }
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
    <main>
      <button onClick={() => toast("logout")}>로그아웃</button>
      {toastFloat && <Toast type="warningToast" msg={toastMsg} />}
      <Footer />
    </main>
  );
};

export default Home;
