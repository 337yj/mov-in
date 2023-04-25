import styles from "./layout.module.scss";
import cx from "classnames";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth/");

  //NOTE: 페이지가 바뀔 때마다 scroll을 최상단으로 올려준다. => react-router-dom scroll to top
  // useEffect(() => {
  //   console.log("layout", location.pathname);
  //   document.documentElement.scrollTo(0, 0);
  // }, [location.pathname]);

  return (
    <section className={styles.wrapper}>
      <ScrollToTop />

      <Header />
      <section
        className={cx(styles.outletWrapper, { [styles.isAuth]: isAuthPage })}
      >
        {/* <ScrollRestoration /> */}
        <Outlet />
      </section>
      <Footer />
    </section>
  );
};

export default Layout;
