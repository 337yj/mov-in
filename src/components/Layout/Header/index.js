import React, { memo, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../../../state";
import useMe from "../../../hooks/useMe";
import { SearchInput } from "../../Common";
import { ImageProfile2 } from "../../../assets";
import { ImageLogo } from "../../../assets";
import { BsChevronDown } from "react-icons/bs";
import * as ProfileImages from "../../../assets/images/profileImages";
import cx from "classnames";
import styles from "./header.module.scss";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const setUser = useSetRecoilState(userState);
  const user = useMe();
  const dropdownRef = useRef(null);

  const onClickNavigate = (path) => {
    return () => {
      navigate(path);
    };
  };

  const onClickIcon = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const onClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const onPopState = () => {
      setIsOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("popstate", onPopState);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("popstate", onPopState);
    };
  }, [dropdownRef]);

  useEffect(() => {
    if (user) {
      setIsOpen(false);
    }
  }, [user]);

  if (location.pathname.startsWith("/auth/")) {
    return null;
  }

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
          placeholder={"영화, 감독, 배우를 검색해보세요."}
        />
        {user ? (
          <div className={styles.dropdownWrapper} ref={dropdownRef}>
            <div className={styles.dropdownInfo} onClick={onClickIcon}>
              <div className={styles.userInfo}>
                <img
                  src={
                    user?.profileImage
                      ? Object.entries(ProfileImages).filter(([key, value]) => {
                          return key === user?.profileImage;
                        })[0][1]
                      : ImageProfile2
                  }
                  alt="profileImage"
                  className={styles.profileImage}
                />
                <p className={styles.username}>{user.nickname ?? user.name}</p>
              </div>
              <BsChevronDown
                className={cx(styles.icon, { [styles.isOpen]: isOpen })}
              />
            </div>
            <menu
              className={cx(styles.itemWrapper, { [styles.isOpen]: isOpen })}
            >
              <li className={styles.item} onClick={onClickNavigate("myPage")}>
                마이페이지
              </li>
              <li className={styles.item} onClick={logout}>
                로그아웃
              </li>
            </menu>
          </div>
        ) : (
          <>
            <p className={styles.login} onClick={onClickNavigate("auth/login")}>
              로그인
            </p>
            <p
              className={styles.logout}
              onClick={onClickNavigate("auth/register")}
            >
              회원가입
            </p>
          </>
        )}
      </div>
    </header>
  );
};

export default memo(Header);
