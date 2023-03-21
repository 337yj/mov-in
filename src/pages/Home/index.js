import React, { useState } from 'react';
import { Input } from '../../components/Common';

import styles from './home.module.scss';

const Home = () => {
  // 로그인 페이지에서 에러 처리
  const [isError, setIsError] = useState(false);
  const onClickPrimaryButton = (e) => {
    e.preventDefault();
    setIsError(!isError);
  };

  return (
    <main>
      <h2>로그인 페이지</h2>
      <form className={styles.wrap}>
        <Input label="email" id="email" placeholder="이메일" />
        <Input label="password" id="email" placeholder="비밀번호" />
        {isError && (
          <p className={styles.errorText}>
            이메일 또는 비밀번호가 맞지 않습니다.
          </p>
        )}
        <button onClick={onClickPrimaryButton}>에러발생</button>
      </form>
    </main>
  );
};

export default Home;
