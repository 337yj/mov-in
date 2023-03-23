import styles from './layout.module.scss';
import Header from './Header';
import Footer from './Footer';
import Toast from '../Common/Toast';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <section className={styles.wrapper}>
      <Header />
      <Toast />
      <Outlet />
      <Footer />
    </section>
  );
};

export default Layout;