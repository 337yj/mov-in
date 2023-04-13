import React, { useState, useEffect } from "react";
import { useMe } from "../../../hooks";
import { updateUser } from "../../../api/User";
import { ImageProfile3 } from "../../../assets/images/profileImages";
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
  const [floatToast, setFloatToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const myInfoData = {
    // nickname: user.nickname,
    // email: user.email,
    // password: user.password,
    // birth: user.birth,
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
        <h3 className={styles.subTitle}>내 프로필을 변경할 수 있습니다.</h3>
      </header>
      <section className={styles.section}>
        <article className={styles.upper}>
          <article className={styles.imgWrapper}>
            <img
              className={styles.profileImg}
              src={user?.profileImage ?? ImageProfile3} />
            <p>프로필 사진 변경하기</p>
          </article>
          <article className={styles.infoWrapper}>
            <div>
              <p>닉네임</p>
              <Input 
                className={styles.inputText}
                placeholder={user?.nickname} />
            </div>
            <div>
              <p>이메일</p>
              <Input className={styles.inputText} />
            </div>
            <div>
              <p>비밀번호</p>
              <Input className={styles.inputText} />
            </div>
            <div>
              <p>생년월일</p>
              <Input className={styles.inputText} />
            </div>
          </article>
        </article>
        <article className={styles.bottom}>
            <p>회원 탈퇴</p>
            <div className={styles.btns}>
              <Button
                color="primary"
                children="저장"
                // onClick={() => {onChangeInfo(); toast("save");}}
              />
              <Button
                color="secondary"
                children="취소"
                // onClick={() => toast("cancel")}
              />
            </div>
          </article>
      </section>
    </main>
  );
};

export default UserInfo;
