import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../api/Auth";
import { saveTokens } from "../../../utils";
import { validateForm } from "./utils";
import { Input, Button } from "../../../components";
import { ImageLogo } from "../../../assets";
import Poster from "../_shared/poster";
import styles from "./register.module.scss";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    birth: "",
    nickname: "",
  });

  const [err, setErr] = useState({});

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      err.email ||
      err.password ||
      err.passwordConfirm ||
      err.name ||
      err.birth ||
      err.nickname
    ) {
      return;
    }

    const userData = {
      email: form.email,
      password: form.password,
      name: form.name,
      birth: form.birth,
      nickname: form.nickname,
    };

    try {
      const response = await register(userData);
      if (response.status === 200) {
        const data = response.data;
        saveTokens(data);
      }
      //console.log("가입됐당");
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // form 값이 변경될 때마다 err값 확인되도록
    setErr(validateForm(form));
  }, [form]);

  return (
    <main>
      <section className={styles.wrapper}>
        <Poster />
        <article>
          <img src={ImageLogo} alt="logo" />
          <form id="registerForm" onSubmit={onSubmit}>
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
            <Input
              name="passwordConfirm"
              value={form.passwordConfirm}
              type="password"
              placeholder="비밀번호 확인"
              errorText={err.passwordConfirm}
              onChange={onChange}
              autoComplete="off"
            />
            <Input
              name="name"
              value={form.name}
              placeholder="이름"
              errorText={err.name}
              onChange={onChange}
              autoComplete="off"
            />
            <Input
              errorText={err.birth}
              onChange={onChange}
              placeholder="생년월일(YYMMDD)"
              name="birth"
              value={form.birth}
              autoComplete="off"
            />
            <Input
              errorText={err.nickname}
              onChange={onChange}
              placeholder="닉네임"
              name="nickname"
              value={form.nickname}
              autoComplete="off"
            />
            <Button type="submit" form="registerForm" color="primary">
              회원가입
            </Button>
          </form>
        </article>
      </section>
    </main>
  );
};

export default Register;
