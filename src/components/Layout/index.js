import styles from "./layout.module.scss";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <section className={styles.wrapper}>
      <Header />
      <Outlet />
      <Footer />
    </section>
  );
};

export default Layout;
