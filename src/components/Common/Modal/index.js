import React, { memo, useCallback } from "react";
import cx from "classnames";
import styles from "./modal.module.scss";
import { IconClose } from "../../../assets";

const Modal = ({
  className,
  children,
  title,
  subTitle,
  buttonFirst,
  buttonSecond,
  onClick,
  setModal,
  // NOTE: 다른 곳에서 모달을 쓸 때 close가 안된다 => setModal도 onClick에 넣어야 합니다.
}) => {
  const onClickClose = useCallback(() => {
    setModal && setModal(false);
    onClick && onClick();
  }, [setModal, onClick]);

  return (
    <div className={cx(styles.overlay)}>
      <section className={cx(styles.modal, className)}>
        <header className={cx(styles.modalHeader)}>
          <div className={cx(styles.titleWrapper)}>
            <h1 className={cx(styles.modalTitle)}>{title}</h1>
            <h2 className={cx(styles.modalSubTitle)}>{subTitle}</h2>
          </div>
          <button className={cx(styles.closeBtn)} onClick={onClickClose}>
            <IconClose />
          </button>
        </header>
        <main className={cx(styles.modalContent)}>
          {children}
          <div className={cx(styles.btnWrapper)}>
            {buttonFirst}
            {buttonSecond}
          </div>
        </main>
      </section>
    </div>
  );
};

export default memo(Modal);

// const Modal = ({ className, children, animation, title, subTitle, buttonFirst,
//   buttonSecond }) => {

//   //const background = useRef();
//   const [modal, setModal] = useState(false);

//   const toggleModal = () => {
//     setModal(!modal);
//   };

//   return (
//     <>
//       <button onClick={toggleModal}>임시버튼</button>
//       {modal && (
//         <div className={cx(styles.overlay)}>
//           <section className={cx(styles.modal)}>
//             <header className={cx(styles.modalHeader)}>
//               <div className={cx(styles.titleWrapper)}>
//                 <h1 className={cx(styles.modalTitle)}>{title}</h1>
//                 <h4 className={cx(styles.modalSubTitle)}>{subTitle}</h4>
//               </div>
//               <button className={cx(styles.modalIcon)} onClick={toggleModal}>
//                 <IconClose />
//               </button>
//             </header>
//             <main className={cx(styles.modalContent)}>
//               {children}
//               <div className={cx(styles.modalFooter)}>
//                 <div>
//                   {buttonFirst}
//                   {buttonSecond}
//                 </div>
//               </div>
//             </main>
//           </section>
//         </div>
//       )}
//     </>
//   );
// };
