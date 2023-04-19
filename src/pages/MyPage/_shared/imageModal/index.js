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
  firstBtn,
  secondBtn,
  onClick
}) => {
  
  const checkImage = (name) => {
    setImage(name);
  };

  console.log(imgList);

  return (
    modal && (
      <>
        <Modal
          setModal={setModal}
          title={title}
          subTitle={subtitle}
          onClick={onClick}
          buttonFirst={firstBtn}
          buttonSecond={secondBtn}
        >
          <section className={styles.imgWrapper}>
            {imgList.map(({ name, id, img }) => {
              <span
                onClick={() => checkImage(id)}
                key={id}
              >{img()}</span>                
            })}
          </section>
        </Modal>
      </>
    )
  );
};

export default ImageModal;
