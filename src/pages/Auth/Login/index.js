import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Poster from "./poster";
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

    // 로그인 form 관리 (해야 됨)
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const onChange = (e) => {
            const { name, value } = e.currentTarget;
            setForm({ ...form, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
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
                        />
                        <Input
                            className={styles.input}
                            placeholder="비밀번호"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={ onChange }
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