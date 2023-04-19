import React, { memo } from "react";
import cx from "classnames";
import { NavLink } from "react-router-dom";
import styles from "./lnb.module.scss";

// MY PAGE 와 BO PAGE 스타일 동일하니 재사용 가능하도록 만듦
const LNB = ({ title, menus, basePath, selectedPath }) => {
  //NOTE: 현재 경로와 메뉴에 있는 경로가 일치하는 값을 찾아서 className에 할당
  const selectedMenu = menus.find((menu) => menu.path === selectedPath);

  return (
    <nav className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      {menus.map((menu, index) => {
        return (
          <NavLink
            className={cx(styles.navMenu, {
              [styles.selected]:
                selectedMenu && selectedMenu.name === menu.name,
            })}
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

export default memo(LNB);
