import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./lnb.module.scss";

const LNB = () => {
  const menus = [
    { name: "프로필", path: "/myPage" },
    { name: "회원정보", path: "/myPage/userInfo" },
    { name: "코멘트 및 평점", path: "/myPage/comment" },
    { name: "좋아요", path: "/myPage/like" },
    { name: "북마크", path: "/myPage/bookmark" },
  ];
  return (
    <nav className={styles.wrapper}>
      <h2 className={styles.title}>MY PAGE</h2>
      {menus.map((menu, index) => {
        return (
          <NavLink className={styles.navMenu} to={menu.path} key={index}>
            {menu.name}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default LNB;
