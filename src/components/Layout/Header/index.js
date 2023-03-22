import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoImage } from '../../../assets';
import { SearchInput } from '../../Common';

import styles from './header.module.scss';

const Header = () => {
  const navigate = useNavigate();

  const onNavigateHome = () => {
    return () => {
      navigate(`/`);
    };
  };

  return (
    <header className={styles.header}>
      <img
        className={styles.logo}
        src={LogoImage}
        alt="logo"
        onClick={onNavigateHome}
      />
      <div className={styles.inputWrapper}>
        <SearchInput
          className={styles.searchInput}
          placeholder={'영화, 감독, 유저를 검색해보세요.'}
        />
        <button type="button">로그인</button>
        <button type="button">회원가입</button>
      </div>
    </header>
  );
};

export default Header;
