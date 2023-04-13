import React, { useState, useEffect } from "react";
import { useMe } from "../../../hooks";
import { updateUser } from "../../../api/User";
import { ImageProfile3 } from "../../../assets/images/profileImages";
import { Button, Card, CheckBox, Input, Toast } from "../../../components";
import styles from "./userInfo.module.scss";

const UserInfo = () => {
  const user = useMe();
  const [floatToast, setFloatToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [form, setForm] = useState({
    nickname: "",
    email: "",
    password: "",
    birth: "",
  });

  const myInfoData = {
    nickname: user?.nickname,
    email: user?.email,
    password: user?.password,
    birth: user?.birth,
  };

  const onChangeInfo = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    setForm({
      nickname: form?.nickname,
      email: form?.email,
      password: '',
      birth: user?.birth,
    });
  }, [form]);

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
              <Input
                name="nickname"
                label="닉네임"
                value={form?.nickname}
                onChange={onChangeInfo}
                className={styles.inputText} />
            </div>
            <div>
              <Input
                name="email"
                label="이메일"
                value={form?.email}
                onChange={onChangeInfo}
                className={styles.inputText} />
            </div>
            <div>
              <Input
                name="password"
                label="비밀번호"
                value={form?.password}
                onChange={onChangeInfo}
                className={styles.inputText} />
            </div>
            <div>
              <Input
                name="birth"
                label="생년월일"
                value={user?.birth}
                className={styles.inputText} />
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
