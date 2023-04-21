import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/Auth";
import { saveTokens } from "../../../utils";
import { getUsersMe } from "../../../api/User";
import { useSetRecoilState } from "recoil";
import { userState } from "../../../state";
import { Input, Button } from "../../../components";
import Poster from "../_shared/poster";
import { ImageLogo } from "../../../assets";
import styles from "./login.module.scss";

// yun@aa.aa
// 12345678
const Login = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

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
    //console.log(response.data);
  };

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: form.email,
      password: form.password,
    };

    try {
      const response = await login(userData);
      if (response.status === 200) {
        const data = response.data;
        saveTokens(data);
      }
      //console.log("로그인성공");
      navigate("/");
      onGetMe();
    } catch (error) {
      // 404: 존재하지 않는 유저
      console.log(error);
    }
  };

  const onClickNavigate = (path) => {
    return () => {
      navigate(path);
    };
  };

  return (
    <main>
      <section className={styles.wrapper}>
        <Poster />
        <article>
          <img src={ImageLogo} alt="logo" />
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
