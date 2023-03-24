import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LNB } from "../../components";
import Profile from "./Profile";
import styles from "./myPage.module.scss";

const MyPage = () => {
  const { pathname } = useLocation();

  return (
    <section className={styles.wrapper}>
      <LNB />
      {/* 경로가 "/myPage"일 때만 Profile 컴포넌트를 렌더링 */}
      {pathname === "/myPage" && <Profile />}
      <Outlet />
    </section>
  );
};

export default MyPage;
