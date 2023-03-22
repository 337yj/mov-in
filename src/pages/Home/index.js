import React from "react";
import { CheckBox } from "../../components/Common";
import CommentBox from "../DetailPage/Comment/components/CommentBox";
import ReplyBox from "../DetailPage/Comment/components/ReplyBox";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <main>
      <section className={styles.wrapper}>
        <header>
          <h1>MainPage</h1>
        </header>
        <CheckBox />

        <h2>Comment</h2>
        <CommentBox />

        <h2>Reply</h2>
        <ReplyBox />
      </section>
    </main>
  );
};

export default Home;
