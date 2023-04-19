import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { deleteUser, getUsersDetail, getUsersInfo } from "../../../../api/User";

import { Modal, Button } from "../../../../components";

import styles from "./boUserModal.module.scss";

const BoUserModal = ({ userId, modal, onCloseModal }) => {
  const [user, setUser] = useState(null);

  const onClickModal = () => {
    onCloseModal();
    setUser(null);
  };

  const onClickDelete = async () => {
    await deleteUser(id);
    alert("탈퇴되었습니다.");
  };

  const onGetUsersDetail = async () => {
    try {
      const response = await getUsersDetail(userId);
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onGetUsersInFo = async () => {
    try {
      const response = await getUsersInfo(userId);
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error(error);
    }
    console.log({ user });
    useEffect(() => {
      onGetUsersDetail();
      onGetUsersInFo();
    }, [userId]);

    if (!user) {
      return null;
    }

    return (
      modal && (
        <Modal
          className={styles.boUserModal}
          user={user}
          title={"회원 관리"}
          onClick={onClickModal}
        >
          <form className={styles.wrapper}>
            <section className={styles.profileWrapper}>
              <figure>
                <img
                  className={styles.profileImage}
                  src={user.id.profileImage}
                  alt="thumbnail"
                />
                <Button color={"dark"}>{user.id.likeCount}</Button>
                <Button color={"dark"}>{user.id.reviewCount}</Button>
              </figure>

              <div className={styles.content}>
                <h4>닉네임</h4>
                <Input>{user.id.nickname}</Input>
                <h4>이메일</h4>
                <Input>{user.id.email}</Input>
                <h4>생년월일</h4>
                <Input>
                  {dayjs(user.id.birth, "YYYYMMDD").format("YYYY.MM.DD")}
                </Input>
                <h4>가입일자</h4>
                <Input>
                  {dayjs(user.id.createdAt, "YYYYMMDD").format("YYYY.MM.DD")}
                </Input>
              </div>
            </section>
            <div className={styles.buttonWrapper}>
              <Button
                className={styles.modify}
                color={"danger"}
                onClick={onClickDelete}
              >
                탈퇴
              </Button>
              <Button className={styles.cancel} color={"secondary"}>
                취소
              </Button>
            </div>
          </form>
        </Modal>
      )
    );
  };
};

export default BoUserModal;
