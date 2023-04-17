import styles from "./layout.module.scss";
import cx from "classnames";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth/");

  return (
    <section className={styles.wrapper}>
      <Header />
      <section
        className={cx(styles.outletWrapper, { [styles.isAuth]: isAuthPage })}
      >
        <Outlet />
      </section>
      <Footer />
    </section>
  );
};

export default Layout;
