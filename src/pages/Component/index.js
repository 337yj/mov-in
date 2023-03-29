import React from "react";
import {
  Button,
  Carousel,
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
              <Button color="primary">저장</Button>
              <Button color="secondary">취소</Button>
              <Button color="danger">탈퇴</Button>
              <Button color="warning">보기</Button>
            </div>
            <Button color="dark">2,200</Button>
            <Button color="login">로그인</Button>
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
            <Modal title="프로필 사진 변경" subTitle="모달서브타이틀"
              buttonFirst={<Button color="primary" children={"저장"} />}
              buttonSecond={<Button color="secondary" children={"취소"} />}>
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
              <NormalTag>OST</NormalTag>
              <NormalTag>연기력</NormalTag>
              <NormalTag>영상미</NormalTag>
              {/* <Tag type="selectTag">연기력</Tag> */}
            </div>
            <div className={styles.tags}>
              <TensionTag>낮음</TensionTag>
              <TensionTag>중간</TensionTag>
              <TensionTag>높음</TensionTag>
            </div>
          </div>
          <div>
            <h2>캐러셀</h2>
            {/* 실제 작업 페이지에서 title 구현해야 됨! */}
            <div className={styles.title}>
              <h3>인기 10위</h3>
              <p>더보기</p>
            </div>
            <Carousel />
          </div>
        </article>
      </section>
    </main>
  );
};

export default Component;
