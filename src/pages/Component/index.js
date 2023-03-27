import React from "react";
import {
  Button,
  CheckBox,
  Input,
  Toggle,
  Stars,
  Modal,
  Toast,
} from "../../components";
import {NormalTag, TensionTag} from "../../components/Common/Tag";
import {CommentOutput, ReplyOutput} from "../index";
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
            <Modal
              description={"프로필 사진을 선택해주세요"}
              buttonFirst={<Button color="primary" children={"저장"} />}
              buttonSecond={<Button color="secondary" children={"취소"} />}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
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
        </article>
      </section>
    </main>
  );
};

export default Component;
