import React, { useState, useEffect, useMemo } from "react";
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
  Table,
} from "../../components";
import { Comment, Reply } from "../index";
import MyPage from "../MyPage";
import styles from "./components.module.scss";

const Component = () => {
  const [toastFloat, setToastFloat] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const columns = [
    // { Header: "프로필사진", accessor: "profileImage" },
    { Header: "닉네임", accessor: "nickname" },
    { Header: "코멘트", accessor: "comment" },
    { Header: "좋아요", accessor: "like" },
    { Header: "가입일자", accessor: "createdAt" },
  ];

  const data = [
    {
      // profileImage : "eee",
      nickname: "박박만두",
      comment: "5",
      like: "124",
      createdAt: "2022-03-29",
    },
    {
      // profileImage : "eee",
      nickname: "appleBanana",
      comment: "5",
      like: "1024",
      createdAt: "2022-02-27",
    },
    {
      // profileImage : "eee",
      nickname: "독고만두",
      comment: "125",
      like: "1124",
      createdAt: "2021-03-29",
    },
    {
      // profileImage : "eee",
      nickname: "제갈만두",
      comment: "75",
      like: "1324",
      createdAt: "1997-03-29",
    },
  ];

  const msgList = {
    logout: "로그아웃 되었습니다",
    copy: "링크가 복사 되었습니다",
    mveDel: "영화가 삭제 되었습니다",
    cmtDel: "코멘트가 삭제 되었습니다",
    mbrDel: "회원 탈퇴 되었습니다",
    //report : "신고 처리 되었습니다",
    //ignore : "무시 처리 되었습니다",
  };

  const toast = (msg) => {
    if (!toastFloat) {
      setToastFloat(true);
      setToastMsg(msgList[msg]);
    }
  };

  const onCloseToast = () => {
    setToastFloat(!toastFloat);
  };

  useEffect(() => {
    if (toastFloat) {
      setTimeout(() => {
        setToastFloat(false);
        setToastMsg("");
      }, 2000);
    }
  }, [toastFloat]);

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
              <Button color="primary" text="저장" />
              <Button color="secondary" text="취소" />
              <Button color="danger" text="탈퇴" />
              <Button color="warning" text="보기" />
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
            {/* <h2>코멘트</h2>
            <Comment />
          </div>
          <div>
            <h2>코멘트답글</h2>
            <Reply /> */}
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
            <Table
              columns={columns}
              data={data}
              firstButton={<Button color="warning" text="보기" />}
              secondButton={<Button color="danger" text="탈퇴" />}
            />
          </div>
          <div>
            <h2>모달</h2>
            {/* <Modal
              title="프로필 사진 변경"
              subTitle="모달서브타이틀"
              buttonFirst={<Button color="primary" text="저장" />}
              buttonSecond={<Button color="secondary" text="취소" />}
            >
              description
            </Modal> */}
          </div>
          <div>
            <h2>토스트</h2>
            <Button
              color="primary"
              onClick={() => toast("logout")}
              text="로그아웃"
            />
            {toastFloat && <Toast children={toastMsg} />}
          </div>
          <div>
            {/* <h2>태그</h2>
            <div className={styles.tags}>
              <Tag text="OST" />
            </div> */}
          </div>
          <div>
            <h2>캐러셀</h2>
            {/* 실제 작업 페이지에서 title 구현해야 됨! */}
            <div className={styles.title}>
              <h3>인기 10위</h3>
              <p>더보기</p>
            </div>
            {/* <Carousel /> */}
          </div>
        </article>
      </section>
    </main>
  );
};

export default Component;
