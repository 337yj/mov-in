import React, { useState } from "react";
import { useMount } from "react-use";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { TiLockClosed } from "react-icons/ti";
import { userState } from "../../state";
import { getReviewUser } from "../../api/Review";
import { getUsersDetail } from "../../api/User";
import UserCard from "./UserCard";
import { ImageProfile2 } from "../../assets/images/profileImages";
import styles from "./userPage.module.scss";

const UserPage = () => {
  const params = useParams();
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const [userReviews, setUserReviews] = useState([]);
  //const [user, setUser] = useState({});

  const onGetUserInfo = async () => {
    const response = await getUsersDetail(params.id);
    if (response.status === 200) {
      setUser(response.data);
    }
  };

  const onGetReviews = async () => {
    const response = await getReviewUser(params.id);
    if (response.status === 200) {
      setUserReviews(response.data);
    }
  };

  const onNavigateReviews = (id) => {
    return () => {
      navigate(`/commentDetail/${id}`);
    };
  };

  // useMount(() => {
  //   onGetUserInfo();
  //   onGetReviews();
  // });

  console.log(user);
  return (
    <main className={styles.wrapper}>
      <section className={styles.info}>
        <header className={styles.header}>
          <h1 className={styles.title}>프로필</h1>
        </header>
        <div className={styles.myInfo}>
          <img
            className={styles.profileImg}
            src={user?.profileImage ?? ImageProfile2}
          />
          <h4>{user?.nickname} 님</h4>
        </div>
        {!user?.isPublic ? (
          <article className={styles.privateMode}>
            <div className={styles.iconWrapper}>
              <TiLockClosed />
            </div>
            <p>프로필이 비공개로 설정 되었습니다</p>
          </article>
        ) : (
          <>
          <div className={styles.introWrapper}>
          <textarea
            name={"description"}
            className={styles.introText}
            value={user?.description || ""}
            readOnly
          />
        </div>
          <div className={styles.cardList}>
            <div className={styles.ratedMovie}>
              <h1>최근 평가한 영화</h1>
            </div>
            {userReviews.map((review) => (
              <UserCard key={review.id} review={review} />
            ))}
          </div>
          </>
        )}
      </section>
    </main>
  );
};

export default UserPage;
