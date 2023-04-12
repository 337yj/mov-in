import React, { useState, useEffect } from "react";
import { Button, Modal } from "../../../../components";
import styles from "./alertModal.module.scss";

const AlertModal = ({onClick, children}) => {


  return (
  
  <Modal>
    <section>
        <h1>{children}</h1>
    </section>
  </Modal>
  );
};

export default AlertModal;
