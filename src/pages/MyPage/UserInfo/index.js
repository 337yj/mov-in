import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import dayjs from "dayjs";
import { useMe } from "../../../hooks";
import { updateUser } from "../../../api/User";
import { userState } from "../../../state";
import { ImageProfile2 } from "../../../assets/images/profileImages";
import { Button, Input, Toast } from "../../../components";
import { ImageModal } from "../_shared";
import { msgList } from "../constants";
import styles from "./userInfo.module.scss";

const UserInfo = () => {
// <<<<<<< KNI
  //const user = useMe();
  //const user = useRecoilValue(userState);
  //const [floatToast, setFloatToast] = useState(false);
  const [openImgModal, setOpenImgModal] = useState(false);
  //const [toastMsg, setToastMsg] = useState("");
  //const [info, setInfo] = useState({
  //  nickname: '',
  //  email : '',
  //  password: '',
  //  profileImage: '',
  //});

// =======
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

//<<<<<<< KNI
  const onClickImg = () => {
    setOpenImgModal(!openImgModal);
  };

  const toast = (msg) => {
    if (!floatToast) {
      setFloatToast(true);
      setToastMsg(msgList[msg]);
    }
  };

  useEffect(() => {
    if (floatToast) {
      setTimeout(() => {
        setFloatToast(false);
      }, 2000);
    }
  }, [floatToast]);

//=======
  useEffect(() => {
    setForm({
      nickname: form?.nickname,
      email: form?.email,
      password: '',
      birth: user?.birth,
    });
  }, [form]);
//>>>>>>> main

  return (
    <main className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>회원 정보</h1>
        </div>
        <h3 className={styles.subTitle}>회원 정보를 변경할 수 있습니다</h3>
      </header>
      <section className={styles.section}>
        <article className={styles.upper}>
          <article className={styles.imgWrapper}>
            <img
              className={styles.profileImg}
              src={user?.profileImage ?? ImageProfile2} />
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


{/*  
    <main className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>회원 정보</h1>
        </div>
         <h3 className={styles.subTitle}>회원 정보를 변경할 수 있습니다</h3>
      </header>
      <section>
        <article className={styles.info}>
          <div className={styles.image}>
            <img src={user?.userImage ?? ImageProfile2} />
            <h5>프로필 사진 변경하기</h5>
          </div>
          <div className={styles.infoInput}>
            <Input label={"닉네임"} value={user?.nickname} />
            <Input label={"이메일"} value={user?.email} />
            <Input label={"비밀번호"} />
            <Input label={"생년월일"} readOnly value={dayjs(user?.birth, "YYMMDD").format("YY.MM.DD")}/>
          </div>
        </article>
        <div className={styles.deleteUser}>
          <h5>회원탈퇴</h5>
        </div>
        </section>
      <div className={styles.btn}>
        <Button
          color="secondary"
          children="취소"
          onClick={() => toast("cancel")}
        />
        <Toast children={toastMsg} float={floatToast} />
        <Button
          color="primary"
          children="저장"
          onClick={() => {
            toast("save");
          }}
        />
        <Toast children={toastMsg} float={floatToast} />
          <ImageModal />
      </div>
    </main>
  );
};
*/}
