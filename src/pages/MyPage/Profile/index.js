import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMe } from "../../../hooks";
import { useRecoilValue } from "recoil";
import cx from "classnames";
import { Button, Card, Carousel, CheckBox, Input, Toast } from "../../../components";
import { AlertModal, ImageModal } from "../_shared";
import { ImageProfile1 } from "../../../assets/images/profileImages";
import styles from "./profile.module.scss";

const Profile = () => {
  const { id } = useParams();
  const myProfile = useMe();
  //const [myInfo, setMyInfo] = useState();
  const [isPublic, setIsPublic] = useState(false);
  const [introduce, setIntroduce] = useState("");
  const [floatToast, setFloatToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const navigate = useNavigate();

  const msgList = {
    cancel : "취소 되었습니다",
    save : "저장 되었습니다",
  };

  // const onClickImage = () => {
  //   navigate(`/myPage/userInfo${user.id}`);
  // };

  //const user = useRecoilValue();

  // const onGetUser = async () => {
  //   try {
  //     const response = await getUsersMe(id);
  //     if (response.status === 200) {
  //       setMyInfo(response.data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onChangeIntro = (e) => {
    setIntroduce(e.target.value);
  };

  const onClickPublic = () => {
    setIsPublic(!isPublic);
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

  console.log();

  return (
    <main className={styles.wrapper}>
      {/* <myHeader title={"프로필"} subtitle={"내 프로필을 변경할 수 있습니다"} /> */}
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>프로필</h1>
          {isPublic ? (
            <Button
              color={"primary"}
              children={"공개"}
              onChange={onClickPublic}
            />
          ) : (
            <Button
              color={"primary"}
              children={"비공개"}
              onChange={onClickPublic}
              className={cx(styles.isPublic)}
            />
          )}
        </div>
        <h3 className={styles.subTitle}>내 프로필을 변경할 수 있습니다</h3>
      </header>

      <section>
        <div className={styles.myInfo}>
          <img className={styles.profileImg} src={ImageProfile1} />
          <h4>뫄뫄님</h4>
        </div>
        <Input
          placeholder="소개글을 작성해 주세요"
          value={introduce}
          onChange={onChangeIntro}
        />
        <div className={styles.ratedMovie}>
          <h1>최근 평가한 영화</h1>
          {/* <Card movie={movie}/> */}
        </div>

        <div className={styles.checkInfo}>
          <CheckBox className={styles.checkbox} onClick={onClickPublic} check={isPublic}/>
          <h5>공개 모드로 전환하기</h5>
          <Button color="secondary" children="취소" onClick={() => toast("cancel")} />
          {floatToast && <Toast children={toastMsg} />}
          <Button color="primary" children="저장" onClick={() => toast("save")}/>
          {floatToast && <Toast children={toastMsg} />}
          {/* <AlertModal /> */}
        </div>
      </section>
    </main>
  );
};

export default Profile;
