import styles from './layout.module.scss';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <section className={styles.wrapper}>
      <Header />
      <Outlet />
    </section>
  );
};

export default Layout;
