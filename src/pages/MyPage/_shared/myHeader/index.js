import React from "react";
import styles from "./myHeader.module.scss";


const myHeader = (title, subtitle, section) => {
  return (
      <section className={styles.header}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>{title}</h1>
          {section}
        </div>
        <h3 className={styles.subTitle}>{subtitle}</h3>
      </section>
  );
};

export default myHeader;