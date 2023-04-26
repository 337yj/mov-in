import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../../api/Auth";
import { getUsersMe } from "../../../api/User";
import { useRecoilState, useSetRecoilState } from "recoil";
import { toastFloatState, userState } from "../../../state";
import { saveTokens } from "../../../utils";
import { validateForm } from "../_shared/loginUtils";
import { Button, Input, Toast } from "../../../components";
import Poster from "../_shared/poster";
import { ImageLogo } from "../../../assets";
import styles from "./adminLogin.module.scss";

const AdminLogin = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const [toastFloat, setToastFloat] = useRecoilState(toastFloatState);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState({
    email: "",
    password: "",
  });

  const onGetMe = async () => {
    try {
      const response = await getUsersMe();
      if (response.status === 200) {
        const data = response.data;
        setUser(data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return;
      }
    }
  };

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(form);
    setErr(errors);

    const userData = {
      email: form.email,
      password: form.password,
    };

    try {
      const response = await adminLogin(userData);
      if (response.status === 200) {
        const data = response.data;
        saveTokens(data);
      }
      navigate("/boPage");
      onGetMe();
    } catch (error) {
      setToastFloat(true);
    }
  };

  const onClickNavigate = (path) => {
    return () => {
      navigate(path);
    };
  };

  useEffect(() => {
    if (toastFloat) {
      setTimeout(() => {
        setToastFloat(false);
      }, 2000);
    }
  }, [toastFloat]);

  return (
    <main>
      <Toast
        children={"입력하신 정보가 정확하지 않습니다."}
        float={toastFloat}
      />
      <section className={styles.wrapper}>
        <Poster />
        <article>
          <img src={ImageLogo} alt="logo" onClick={onClickNavigate("/")} />
          <form id="loginForm" onSubmit={onSubmit}>
            <Input
              name="email"
              value={form.email}
              placeholder="이메일"
              errorText={err.email}
              onChange={onChange}
              autoComplete="off"
            />
            <Input
              name="password"
              value={form.password}
              type="password"
              placeholder="비밀번호"
              errorText={err.password}
              onChange={onChange}
              autoComplete="off"
            />
            <p onClick={onClickNavigate("/auth/adminRegister")}>
              관리자 등록을 하시겠습니까?
            </p>
            <Button type="submit" form="loginForm" color="primary">
              로그인
            </Button>
          </form>
        </article>
      </section>
    </main>
  );
};

export default AdminLogin;
