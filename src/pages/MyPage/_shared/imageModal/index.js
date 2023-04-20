import React, { useState, useEffect } from "react";
import cx from "classnames";
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
  onClick,
}) => {
  
  const checkImage = (id) => {
    setImage(id);
    onClick();
  };

  return (
    modal && (
      <>
        <Modal
          setModal={setModal}
          title={title}
          subTitle={subtitle}
          onClick={onClick}
        >
          <article className={styles.content}>
            <div className={styles.imgWrapper}>
              {imgList.map(({ id, name, img, imgId }) => {
                return (
                  <span onClick={() => checkImage(id)} key={imgId}>
                    {img()}
                  </span>
                );
              })}
            </div>
          </article>
        </Modal>
      </>
    )
  );
};

export default ImageModal;
