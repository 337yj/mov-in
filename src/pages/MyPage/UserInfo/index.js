import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue, atom, useRecoilState } from "recoil";
import dayjs from "dayjs";
import { useMount } from "react-use";
import { useMe } from "../../../hooks";
import { updateUser, getUsersMe, deleteUser, updateMe } from "../../../api/User";
import { userState } from "../../../state";
import { ImageProfile2 } from "../../../assets/images/profileImages";
import { Button, Input, Toast } from "../../../components";
import { ImageModal } from "../_shared";
import { msgList } from "../constants";
import styles from "./userInfo.module.scss";

const UserInfo = () => {
  const user = useMe();
  const [me, setMe] = useRecoilState(userState);
  const [openImgModal, setOpenImgModal] = useState(false);
  const [floatToast, setFloatToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [form, setForm] = useState({
    nickname: '',
    email: '',
    password: '',
    birth: '',
    profileImage: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  const onChangeInfo = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  //내 정보 불러오기
  const onGetMe = async () => {
    const response = await getUsersMe();
    if(response.status === 200) {
      setMe(response.data);
    }
  }

  //회원탈퇴
  const onDelete = async () => {
    const response = await deleteUser(user?.id);
    if (response.status === 204) {
      alert('삭제 완료 되었습니다');
      navigate('/');
    } else {
      alert('오류!');
    }
  };

  useMount(()=>{
    onGetMe();
  })

  //저장
  const onSubmit = async (e) => {
    // if (e && e.preventDefault) { e.preventDefault(); }
    e.preventDefault();
    
    const myInfoData = {
      nickname: form?.nickname,
      email: form?.email,
      password: form?.password,
      birth: form?.birth,
      profileImage: form?.profileImage
    };

    try {
      const responsePatch = await updateMe(myInfoData);
      if (responsePatch.status === 204) {
        onGetMe();
        //toast("save");
      }
    } catch (err) {
      const errData = err.response.data;
      alert(errData.message);
      //toast("fail");
    }
  };

  //프로필 모달
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
  
  useEffect(() => {
    setForm({
      nickname: me?.nickname,
      email: me?.email,
      password: me?.password,
      birth: me?.birth,
      profileImage: me?.profileImage,
    });
  }, [me]);

  console.log(form);
  console.log(user);

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
              onClick={onClickImg}
              className={styles.profileImg}
              src={user?.profileImage ?? ImageProfile2}
            />
            <p onClick={onClickImg}>프로필 사진 변경하기</p>
          </article>
          <article className={styles.infoWrapper}>
            <div>
              <Input
                name="nickname"
                label="닉네임"
                value={form?.nickname}
                onChange={onChangeInfo}
                className={styles.inputText}
              />
            </div>
            <div>
              <Input
                name="email"
                label="이메일"
                value={form?.email}
                onChange={onChangeInfo}
                className={styles.inputText}
              />
            </div>
            <div>
              <Input
                name="password"
                label="비밀번호"
                type="password"
                value={form?.password}
                onChange={onChangeInfo}
                className={styles.inputText}
              />
            </div>
            <div>
              <Input
                name="birth"
                label="생년월일"
                //value={dayjs(user?.birth, "YYMMDD").format("YY.MM.DD")}
                value={form?.birth}
                className={styles.inputText}
                readOnly
              />
            </div>
          </article>
        </article>
        <article className={styles.bottom}>
          <p onClick={() => onDelete(user.id)}>회원 탈퇴</p>
          <div className={styles.btns}>
            <Button
              color="secondary"
              children="취소"
              onClick={() => toast("cancel")}
            />
            <Button
              color="primary"
              children="저장"
              onClick={(e) => {
                onSubmit(e);
                toast("save");
              }}
            />
            <Toast children={toastMsg} float={floatToast} />
          </div>
        </article>
      </section>
    </main>
  );
};

export default UserInfo;