import React, { useState, useEffect } from "react";
import { useMe } from "../../../../hooks";
import { Button, Modal } from "../../../../components";
import { imgList } from "./image.js";
import styles from "./imageModal.module.scss";

const ImageModal = ({
  setImage,
  modal,
  setModal,
  title,
  subtitle,
  buttonFirst,
  buttonSecond,
  onClick
}) => {
  const checkImage = (name) => {
    setImage(name);
  };

  return (
    modal && (
      <>
        <Modal
          setModal={setModal}
          title={title}
          subTitle={subtitle}
          onClick={onClick}
          buttonFirst={buttonFirst}
          buttonSecond={buttonSecond}
        >
          <section className={styles.imgWrapper}>
            {imgList.map(({ id, name, img }) => {
              <span
                onClick={() => {
                  checkImage(name);
                }}
                key={id}
              >
                {img()}
              </span>;
            })}
            <div className={styles.imgWrapper}>
            {buttonFirst}
            {buttonSecond}
            </div>
          </section>
        </Modal>
      </>
    )
  );
};

export default ImageModal;
