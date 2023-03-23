import React from "react";
import LikeCount from "../DetailPage/Comment/components/likeCount";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <main className={styles.wrapper}>
      메인 페이지
      <LikeCount />
    </main>
  );
};

export default Home;
