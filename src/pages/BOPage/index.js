import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LNB } from "../../components";
import BOMovie from "./BOMovie";

import { menus } from "./constants";
import styles from "./boPage.module.scss";

const BOPage = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  // useEffect(() => {
  //   if (!auth) {
  //     // 로그인이 되지 않았으면
  //     history.replace("/auth/login/admin"); // 로그인 페이지로 이동시킵니다.
  //   }
  // });

  return (
    <section className={styles.wrapper}>
      <LNB
        title="BO PAGE"
        menus={menus}
        basePath="/boPage"
        selectedPath={pathname.split("/boPage").at(1)}
      />

      {pathname === "/boPage" && <BOMovie />}
      <div className={styles.outletWrapper}>
        <Outlet />
      </div>
    </section>
  );
};

export default BOPage;
