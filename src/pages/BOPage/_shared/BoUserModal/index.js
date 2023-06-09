import React, { useEffect, useState } from "react";

import { deleteUser, getUsersDetail, getUsersInfo } from "../../../../api/User";

import { Modal, Button, Input } from "../../../../components";

import styles from "./boUserModal.module.scss";
import dayjs from "dayjs";
import { ImageProfile2 } from "../../../../assets";
import * as ProfileImages from "../../../../assets/images/profileImages";
import { BsHeart, BsLinkedin } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

const BoUserModal = ({ userId, modal, onCloseModal }) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const onClickModal = () => {
    onCloseModal();
    setUser(null);
  };

  const onClickToUserPage = () => {
    navigate(`/userPage/${user?.id}`);
  }

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
        setUserInfo(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //console.log({ userId, user });

  useEffect(() => {
    onGetUsersDetail();
    onGetUsersInFo();
  }, [userId]);

  if (!user) {
    return null;
  }
  //console.log(user);
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
                src={
                  !user?.profileImage || user?.profileImage.includes("Icon")
                  ? ImageProfile2
                  : Object.entries(ProfileImages).filter(([key, value]) => {
                      return key === user?.profileImage;
                    })[0][1]
                }
                onClick={onClickToUserPage}
                alt="thumbnail"
              />
              <div className={styles.count}>
                <BsHeart />
                {userInfo?.likeCount.toLocaleString()}
              </div>
              <div className={styles.count}>
                <TfiCommentAlt />
                {userInfo?.reviewCount.toLocaleString()}
              </div>
            </figure>

            <div className={styles.content}>
              <h4>닉네임</h4>
              <Input readOnly value={user?.nickname}></Input>
              <h4>이메일</h4>
              <Input readOnly value={user?.email}></Input>
              <h4>생년월일</h4>
              <Input
                readOnly
                value={dayjs(user?.birth, "YYYYMMDD").format("YYYY.MM.DD")}
              ></Input>
              <h4>가입일자</h4>
              <Input
                readOnly
                value={dayjs(user?.createdAt, "YYYYMMDD").format("YYYY.MM.DD")}
              ></Input>
            </div>
          </section>
          <div className={styles.buttonWrapper}>
            <Button
              className={styles.cancel}
              color={"secondary"}
              onClick={onClickModal}
            >
              취소
            </Button>
            <Button
              className={styles.modify}
              color={"danger"}
              onClick={onClickDelete}
            >
              탈퇴
            </Button>
          </div>
        </form>
      </Modal>
    )
  );
};

export default BoUserModal;
