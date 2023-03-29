import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Poster from "./poster";
import { validateEmail, validatePassword } from "./utils";
import { Input, Button } from "../../../components";
import { ImageLogo } from "../../../assets";
import styles from "./login.module.scss";

const Login = () => {
    // 로고 누르면 홈으로 / 회원이~? 누르면 회원가입으로 이동
    const navigate = useNavigate();

    const onNavigateHome = () => {
        navigate(`/`);
    };

    const onNavigateRegister = () => {
      navigate(`/signup`);
    };

    // 로그인 폼 관리
    const [form, setForm] = useState({
      email: "",
      password: "",
    });

    // 로그인 상태 관리
    const[status, setStatus] = useState({
      email: "",
      password: "",
    });

    // 인풋에 데이터가 변경될 때 호출 됨
    const onChange = (e) => {
      const { name, value } = e.currentTarget;
      setForm({ ...form, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        
        const validatedEmail = validateEmail(form.email);
        if (typeof validatedEmail === "string"){
            setStatus(validatedEmail);
            return;
        };

        validatePassword();

        const { email, password } = form;
        const response = await Login({
            email,
            password,
        });

        if (response.data) {
            const { accessToken, refreshToken } = response.data;
            localStorage.setItem("ACCESS_TOKEN", accessToken);
            localStorage.setItem("REFRESH_TOKEN", refreshToken);

            navigate(`/`);
        };
    };

    // 할 것: 유효성 검사
    return (
        <main>
            <section className={styles.wrapper}>
                <Poster />
                <article>
                    <img src={ ImageLogo } onClick={ onNavigateHome } alt="logo" />
                        <form id="loginForm" onSubmit={ onSubmit }>
                        <Input
                            className={styles.input}
                            placeholder="이메일"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={ onChange }
                            errorText={ status.email }
                        />
                        <Input
                            className={styles.input}
                            placeholder="비밀번호"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={ onChange }
                            errorText={ status.password }
                        />
                        <p onClick={ onNavigateRegister }>회원이 아니신가요?</p>
                        <Button type="submit" form="loginForm" color="login">로그인</Button>
                    </form>
                </article>
            </section>
        </main>
    );
};

export default Login;
