import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./lnb.module.scss";

// MY PAGE 와 BO PAGE 스타일 동일하니 재사용 가능하도록 만듦
const LNB = ({ title, menus, basePath }) => {
  return (
    <nav className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      {menus.map((menu, index) => {
        return (
          <NavLink
            className={styles.navMenu}
            to={`${basePath}${menu.path}`}
            key={index}
          >
            {menu.name}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default LNB;
