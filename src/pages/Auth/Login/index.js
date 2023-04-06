import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/Auth";
import { isValidateEmail } from "../../../utils";
import { Input, Button } from "../../../components";
import { ImageLogo } from "../../../assets";
import Poster from "./poster";
import styles from "./login.module.scss";

// yun@aa.aa
// 12345678
const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // 수정중
    // if (!form.email && !form.password) {
    //   return setErr({
    //     ...err,
    //     email: "이메일을 입력해주세요.",
    //     password: "비밀번호를 입력해주세요.",
    //   });
    // }
    // if (!form.email) {
    //   return setErr({ ...err, email: "이메일을 입력해주세요." });
    // }
    // if (!isValidateEmail(form.email)) {
    //   return setErr({ ...err, email: "유효한 이메일을 입력해주세요." });
    // }
    // if (!form.password) {
    //   return setErr({
    //     ...err,
    //     email: "",
    //     password: "비밀번호를 입력해주세요.",
    //   });
    // }
    // if (form.password.length < 8) {
    //   return setErr({
    //     ...err,
    //     email: "",
    //     password: "비밀번호는 8자 이상이어야 합니다.",
    //   });
    // }

    try {
      const response = await login({
        email: form.email,
        password: form.password,
      });
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("ACCESS_TOKEN", accessToken);
      localStorage.setItem("REFRESH_TOKEN", refreshToken);
      console.log("로그인성공");
      navigate("/");
    } catch (err) {
      // 404: 존재하지 않는 유저
      console.log(err);
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
            <p onClick={onClickNavigate("auth/register")}>회원이 아니신가요?</p>
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
