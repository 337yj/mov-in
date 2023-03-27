import React, {useState, useRef, memo} from "react";
import cx from "classnames";
import {IconClose} from "../../../assets";
import styles from "./modal.module.scss";

const Modal = ({
  className,
  description,
  children,
  buttonFirst,
  buttonSecond,
}) => {
  //const background = useRef();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <button onClick={toggleModal}>임시버튼</button>
      {modal && (
        <div className={cx(styles.overlay)}>
          <section className={cx(styles.modal)}>
            <header className={cx(styles.modalHeader)}>
              <div>
                <h1 className={cx(styles.modalTitle)}>Title</h1>
                <h4 className={cx(styles.modalSubTitle)}>{description}</h4>
              </div>
              <button className={cx(styles.modalIcon)} onClick={toggleModal}>
                <IconClose />
              </button>
            </header>
            <main className={cx(styles.modalContent)}>
              {children}
              <div className={cx(styles.modalFooter)}>
                <div>
                  {buttonFirst}
                  {buttonSecond}
                </div>
              </div>
            </main>
          </section>
        </div>
      )}
    </>
  );
};

export default memo(Modal);
