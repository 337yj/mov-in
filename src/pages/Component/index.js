import React, {useState, useEffect} from "react";
import {Button, CheckBox, Input, Toggle, Tag, Modal, Toast} from "../../components";
import CommentBox from "../DetailPage/Comment/components/CommentBox";
import ReplyBox from "../DetailPage/Comment/components/ReplyBox";
import styles from "./components.module.scss";

const Component = () => {

  return (
    <main>
      <section className={styles.wrapper}>
        <header>
          <h1>컴포넌트</h1>
        </header>
        <article>
          <div>
            <h2>버튼</h2>
            <div className={styles.buttons}>
              <Button>저장</Button>
              <Button color="secondary">취소</Button>
              <Button color="danger">탈퇴</Button>
              <Button color="warning">보기</Button>
              <Button color="dark">2,200</Button>
              <Button color="login">로그인</Button>
            </div>
          </div>
          <div>
            <h2>체크박스</h2>
            <CheckBox />
          </div>
          <div>
            <h2>입력창</h2>
            <Input />
          </div>
          <div>
            <h2>토글</h2>
            <Toggle />
          </div>
          <div>
            <h2>코멘트박스</h2>
            <CommentBox />
          </div>
          <div>
            <h2>코멘트답글박스</h2>
            <ReplyBox />
          </div>
          <div>
            <h2>모달</h2>
            <Modal>description</Modal>
          </div>
          <div>
            <h2>토스트</h2>
            <Toast />
          </div>
          <div>
            <h2>태그</h2>
            <div className={styles.tags}>
              <Tag>OST</Tag>
              <Tag type="selectTag">연기력</Tag>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Component;
