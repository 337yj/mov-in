import React, {useState, useRef, memo} from "react";
import cx from "classnames";
import styles from "./modal.module.scss";
import { IconClose } from "../../../assets";

const Modal = ({ className, children, animation, title, subTitle, buttonFirst,
  buttonSecond }) => {

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
              <div className={cx(styles.titleWrapper)}>
                <h1 className={cx(styles.modalTitle)}>{title}</h1>
                <h4 className={cx(styles.modalSubTitle)}>{subTitle}</h4>
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
