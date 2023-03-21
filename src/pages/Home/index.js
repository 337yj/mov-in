import React from "react";
import { CheckBox } from "../../components";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <main>
      <section className={styles.wapper}>
        <header>
          <h1>MainPage</h1>
        </header>

        <h2>CheckBox</h2>
        <CheckBox />
      </section>
    </main>
  );
};

export default Home;
