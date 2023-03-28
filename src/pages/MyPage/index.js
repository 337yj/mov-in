import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LNB } from "../../components";
import Profile from "./Profile";
import styles from "./myPage.module.scss";

const MyPage = () => {
  const { pathname } = useLocation();

  const menus = [
    { name: "프로필", path: "" },
    { name: "회원정보", path: "/userInfo" },
    { name: "코멘트 및 평점", path: "/comment" },
    { name: "좋아요", path: "/like" },
    { name: "북마크", path: "/bookmark" },
  ];

  return (
    <section className={styles.wrapper}>
      <LNB title="MY PAGE" menus={menus} basePath="/myPage" />
      {/* 경로가 "/myPage"일 때만 Profile 컴포넌트를 렌더링 */}
      {pathname === "/myPage" && <Profile />}
      <div className={styles.outletWrapper}>
        <Outlet />
      </div>
    </section>
  );
};

export default MyPage;
