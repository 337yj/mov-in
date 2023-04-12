import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import cx from "classnames";
import { useMe } from "../../../hooks";
import { userState } from "../../../state";
import { getReviewMe } from "../../../api/Review";
import { updateUser } from "../../../api/User";
import {
  Button,
  Card,
  CheckBox,
  Input,
  Toast,
} from "../../../components";
// import EditMode from "./EditMode";
import MyCard from "./MyCard";
import { AlertModal, ImageModal } from "../_shared";
import { ImageProfile2 } from "../../../assets/images/profileImages";
import styles from "./profile.module.scss";

const Profile = ({open}) => {
  const { id } = useParams();
  const user = useMe();
  const [isPublic, setIsPublic] = useState(false);
  const [introduce, setIntroduce] = useState("");
  const [floatToast, setFloatToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [myReviews, setMyReviews] = useState([]);

  const navigate = useNavigate();
  //const [myInfo, setMyInfo] = useSetRecoilState(userState);

  const msgList = {
    cancel: "취소 되었습니다",
    save: "저장 되었습니다",
  };

  const getMyMovieList = async () => {
    try {
      const response = await getReviewMe();
      if (response.status === 200) {
        const items = [...response.data].slice(0, 5);
        setMyReviews(items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const updateUserInfo = async () => {
  //   try {
  //     const response = await updateUser();
  //     if (response.status === 204) {
  //       const text = [...response.data];
  //       setIntroduce(text);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const onClickReview = () => {
    navigate("/myPage/comment");
  };

  const onClickImage = () => {
    navigate("/myPage/userInfo");
  };

  const onChangeIntro = (e) => {
    setIntroduce(e.target.value);
  };

  const onClickPublic = () => {
    setIsPublic(!isPublic);
  };

  const onClickSave = async (e) => {
    e.preventDefault();
    return
  }


  const toast = (msg) => {
    if (!floatToast) {
      setFloatToast(true);
      setToastMsg(msgList[msg]);
    }
  };

  useEffect(() => {
    getMyMovieList();
    //updateUserInfo();
  }, []);

  useEffect(() => {
    if (floatToast) {
      setTimeout(() => {
        setFloatToast(false);
      }, 2000);
    }
  }, [floatToast]);

  console.log(introduce);

  return (
    <main className={styles.wrapper}>
      {/* <MyHeader title={"프로필"} subtitle={"내 프로필을 변경할 수 있습니다"} /> */}
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>프로필</h1>
          {user && isPublic ? (
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
          <img
            className={styles.profileImg}
            src={user?.profileImage ?? ImageProfile2}
            onClick={onClickImage}
          />
          <h4>{user?.nickname} 님</h4>
        </div>

        <div className={styles.introWrapper}>
          <textarea
            className={styles.introText}
            value={introduce}
            placeholder={"소개글을 작성해주세요"}
            onChange={onChangeIntro}
          />
        </div>
        {/* <Input
          placeholder="소개글을 작성해 주세요"
          value={introduce}
          onChange={onChangeIntro}
        /> */}
        <div className={styles.ratedMovie}>
          <h1>평가한 영화</h1>
          <h6 onClick={onClickReview}>더보기</h6>
        </div>
        <div className={styles.cardList}>
          {myReviews.map((review) => (
            <MyCard movie={review} />
          ))}
        </div>

        <div className={styles.checkInfo}>
          <CheckBox
            className={styles.checkbox}
            onClick={onClickPublic}
            check={isPublic}
          />
          <h5>공개 모드로 전환하기</h5>
          <Button
            color="secondary"
            children="취소"
            onClick={() => toast("cancel")}
          />
          <Toast children={toastMsg} float={floatToast}/>
          <Button
            color="primary"
            children="저장"
            onClick={() => {
              onClickSave()
              toast("save")
            }}
          />
          <Toast children={toastMsg} float={floatToast}/>
          {/* <AlertModal /> */}
        </div>
      </section>

      {/* <section>
      {user && !isPublic ? <EditMode /> : <div></div>}
      </section> */}
    </main>
  );
};

export default Profile;
