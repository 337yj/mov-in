import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ImageLogo } from "../../../assets";
import { userState } from "../../../state";
import { SearchInput } from "../../Common";
import { ImageProfile2 } from "../../../assets";
import styles from "./header.module.scss";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  console.log(user);
  const onClickNavigate = (path) => {
    return () => {
      navigate(path);
    };
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    console.log("로그아웃");
  };

  useEffect(() => {
    console.log("userState changed");
  }, [user]);

  // if (window.location.pathname === "auth/login") return null;

  return (
    <header className={styles.header}>
      <img
        className={styles.logo}
        src={ImageLogo}
        alt="logo"
        onClick={onClickNavigate("/")}
      />
      <div className={styles.inputWrapper}>
        <SearchInput
          className={styles.searchInput}
          placeholder={"영화, 감독, 유저를 검색해보세요."}
        />
        {user ? (
          <>
            <button type="button" onClick={logout}>
              로그아웃
            </button>

            <img
              src={user.profileImage ?? ImageProfile2}
              alt="profileImage"
              className={styles.profileImage}
            />
            <button type="button" onClick={onClickNavigate("myPage")}>
              {user.nickname ?? user.name}
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={onClickNavigate("auth/login")}>
              로그인
            </button>
            <button type="button" onClick={onClickNavigate("auth/register")}>
              회원가입
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
