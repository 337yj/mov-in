import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMount } from "react-use";
import { useRecoilState } from "recoil";
import cx from "classnames";
import { useMe } from "../../../hooks";
import { userState } from "../../../state";
import { getReviewMe } from "../../../api/Review";
import { updateMe, getUsersMe } from "../../../api/User";
import { Button, CheckBox, Toast } from "../../../components";
import MyCard from "./MyCard";
import { msgList } from "../constants";
//import { AlertModal, ImageModal } from "../_shared";
import { ImageProfile2 } from "../../../assets/images/profileImages";
import styles from "./profile.module.scss";

const Profile = () => {
  //const user = useRecoilValue(userState);
  const { id } = useParams();
  const user = useMe();
  const [me, setMe] = useRecoilState(userState);
  const [isChangePublic, setIsChangePublic] = useState(false);
  //const [introduce, setIntroduce] = useState("");
  const [floatToast, setFloatToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [myReviews, setMyReviews] = useState([]);
  const [form, setForm] = useState({
    description: "",
    isPublic: false,
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  //평가한 영화 목록
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

  //내 정보 불러오기
  const onGetMe = async () => {
    const response = await getUsersMe();
    if (response.status === 200) {
      setMe(response.data);
    }
  };

  const onClickReview = () => {
    navigate("/myPage/comment");
  };

  const onClickImage = () => {
    navigate("/myPage/userInfo");
  };

  // const onChangeIntro = (e) => {
  //   setIntroduce(e.target.value);
  // };

  const onClickCheckbox = () => {
    setIsChangePublic(!isChangePublic);
  };

  //공개처리
  const onClickPublic = async () => {
    const userData = {
      isPublic: !me?.isPublic,
    };
    const response = await updateMe(userData);
    if (response.status === 204) {
      onGetMe();
      //onClickPublic();
    } else {
      console.log("에러!");
    }
  };

  // 저장
  const onSubmit = async (e) => {
    e.preventDefault();

    const introData = {
      description: form?.description,
      //isPublic: form?.isPublic,
    };

    try {
      const responsePatch = await updateMe(introData);
      if (responsePatch.status === 204) {
        onGetMe();
        toast("save");
        onClickCheckbox();
      }
    } catch (err) {
      const errData = err.response.data;
      alert(errData.message);
      toast("fail");
      return;
    }
  };

  useMount(() => {
    onGetMe();
  });

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

  const toast = (msg) => {
    if (!floatToast) {
      setFloatToast(true);
      setToastMsg(msgList[msg]);
    }
  };

  useEffect(() => {
    getMyMovieList();
    setForm({
      description: me?.description,
      isPublic: me?.isPublic,
    });
    //updateUserInfo();
  }, [me]);

  useEffect(() => {
    if (floatToast) {
      setTimeout(() => {
        setFloatToast(false);
      }, 2000);
    }
  }, [floatToast]);

  console.log(form);

  return (
    <main className={styles.wrapper}>
      {/* <MyHeader title={"프로필"} subtitle={"내 프로필을 변경할 수 있습니다"} /> */}
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>프로필</h1>
          {user?.isPublic ? (
            <Button
              color={"primary"}
              children={"공개"}
              onChange={onClickCheckbox}
            />
          ) : (
            <Button
              color={"primary"}
              children={"비공개"}
              onChange={onClickCheckbox}
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
            name={"description"}
            className={styles.introText}
            value={form?.description || ""}
            placeholder={"소개글을 작성해주세요"}
            onChange={onChange}
          />
        </div>
        {/* <Input
          placeholder="소개글을 작성해 주세요"
          value={introduce}
          onChange={onChangeIntro}
        /> */}
        <div className={styles.ratedMovie}>
          <h1>최근 평가한 영화</h1>
        </div>
        <div className={styles.cardList}>
          {myReviews.map((review) => (
            <MyCard key={review.id} movie={review} />
          ))}
        </div>
        <h6 onClick={onClickReview}>더보기</h6>

        <div className={styles.checkInfo}>
          <CheckBox
            className={styles.checkbox}
            onClick={() => {
              onClickPublic();
              onClickCheckbox();
            }}
          />
          <h5>비공개 모드로 전환하기</h5>

          <Button
            color="secondary"
            children="취소"
            onClick={() => toast("cancel")}
          />
          <Toast children={toastMsg} float={floatToast} />
          <Button
            color="primary"
            children="저장"
            onClick={(e) => {
              onSubmit(e);
              //toast("save");
            }}
          />
          <Toast children={toastMsg} float={floatToast} />
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
