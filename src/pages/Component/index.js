import React from "react";

import {
  Button,
  CheckBox,
  Input,
  Toggle,
  Stars,
  Tag,
  Modal,
  Toast,
} from "../../components";
import { CommentOutput, ReplyOutput } from "../index";
import MyPage from "../MyPage";

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
            <h2>코멘트</h2>
            <CommentOutput />
          </div>
          <div>
            <h2>코멘트답글</h2>
            <ReplyOutput />
          </div>
          <div>
            <h2>별점</h2>
            <Stars />
          </div>
          <div>
            <h2>MYPAGE - LNB</h2>
            <MyPage />
          </div>
          <div>
            <h2>모달</h2>
            <Modal title="프로필 사진 변경" subTitle="모달서브타이틀">
              description
            </Modal>
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
