import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/Auth";
import { getUsersMe } from "../../../api/User";
import { useRecoilState, useSetRecoilState } from "recoil";
import { toastFloatState, userState } from "../../../state";
import { saveTokens } from "../../../utils";
import { validateForm } from "../_shared/loginUtils";
import { Input, Button, Toast } from "../../../components";
import Poster from "../_shared/poster";
import { ImageLogo } from "../../../assets";
import styles from "./login.module.scss";

const Login = () => {
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
    const response = await getUsersMe();
    if (response.status === 200) {
      const data = response.data;
      setUser(data);
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
      const response = await login(userData);
      if (response.status === 200) {
        const data = response.data;
        saveTokens(data);
        navigate("/");
        onGetMe();
      }
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
          <img src={ImageLogo} alt="logo" onClick={() => navigate("/")} />
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
            <p onClick={onClickNavigate("/auth/register")}>
              회원이 아니신가요?
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

export default Login;
