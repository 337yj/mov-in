import React, { useState, useEffect } from "react";
import { Button, Modal } from "../../../../components";
import styles from "./alertModal.module.scss";

const AlertModal = ({onClick}) => {


  return (
  
  <Modal>
    <section>
        <h1>변경사항을 저장 하시겠습니까?</h1>
    </section>
  </Modal>
  );
};

export default AlertModal;
