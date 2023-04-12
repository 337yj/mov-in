import React, { useState, useEffect } from "react";
import { useMe } from "../../../hooks";
import { updateUser } from "../../../api/User";
import { ImageProfile2 } from "../../../assets/images/profileImages";
import { Button, Card, CheckBox, Input, Toast } from "../../../components";
import styles from "./userInfo.module.scss";

const UserInfo = () => {
  const user = useMe();
  const [info, setInfo] = useState({
    nickname: "",
    email: "",
    password: "",
    birth: "",
  });

  const myInfoData = {
    nickname: user.nickname,
    email: user.email,
    password: user.password,
    birth: user.birth,
  };

  const onChangeInfo = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  return (
    <main className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>회원 정보</h1>
        </div>
        <h3 className={styles.subTitle}>내 프로필을 변경할 수 있습니다</h3>
      </header>
      <section>
        <div>
          <img></img>
        </div>
      </section>
    </main>
  );
};

export default UserInfo;
