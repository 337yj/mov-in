import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../../api/Auth";
import { saveTokens } from "../../../utils";
import { getUsersMe } from "../../../api/User";
import { userState } from "../../../state";
import { useSetRecoilState } from "recoil";
import { Button, Input } from "../../../components";
import Poster from "../_shared/poster";
import { ImageLogo } from "../../../assets";
import styles from "./adminLogin.module.scss";

// adminYun@aa.aa
// 12345678
// adad@aa.aa
// 123123123
const AdminLogin = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const onGetMe = async () => {
    const response = await getUsersMe();
    if (response.status === 200) {
      const data = response.data;
      setUser(data);
    }
    console.log(response.data);
  };

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

  const onClickNavigate = (path) => {
    return () => {
      navigate(path);
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault();

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
      console.log("어드민 로그인성공");
      navigate("/boPage");
      onGetMe();
    } catch (error) {
      // 404: 존재하지 않는 유저
      console.log(error);
    }
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
