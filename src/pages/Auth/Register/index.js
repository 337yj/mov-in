import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../api/Auth";
import { toastFloatState } from "../../../state";
import { useRecoilState } from "recoil";
import { saveTokens } from "../../../utils";
import { validateForm } from "../_shared/registerUtils";
import { Input, Button, Toast } from "../../../components";
import Poster from "../_shared/poster";
import { ImageLogo } from "../../../assets";
import styles from "./register.module.scss";

const Register = () => {
  const navigate = useNavigate();
  const [toastFloat, setToastFloat] = useRecoilState(toastFloatState);

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
      return setToastFloat(true);
    }

    const userData = {
      email: form.email,
      password: form.password,
      name: form.name,
      birth: form.birth,
      nickname: form.nickname,
    };

    const response = await register(userData);
    if (response.status === 200) {
      const data = response.data;
      saveTokens(data);
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    setErr(validateForm(form));
  }, [form]);

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
              placeholder="생년월일(YYYYMMDD)"
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
