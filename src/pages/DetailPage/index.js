import React from "react";
import { useParams } from "react-router-dom";
import styles from "./detail.module.scss";

const Detail = () => {
  const { title } = useParams();
  return (
    <main>
      <section className={styles.wrapper}>
        this is detail page(temporary)
      </section>
    </main>
  );
};

export default Detail;
