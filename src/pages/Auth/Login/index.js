import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "../../../components";
import { ImageLogo } from "../../../assets";
import data from "../../../fake.json";
import styles from "./login.module.scss";

const Login = () => {
    // 로고 누르면 홈으로 이동, 회원이~? 누르면 회원가입으로 이동
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
        if(!setForm){
            e.preventDefault();
        };
    };

    // 랜덤 영화 포스터
    // 가짜 데이터 내의 이미지 화질이 낮아서 깨짐
    const posterArr = data.map(movie => movie.image)
    const posterIdx = Math.floor(Math.random() * posterArr.length)
    const randomPoster = posterArr[posterIdx]

    // 할 것: 유효성 검사, 포스터 랜덤으로 띄우기
    return (
        <main>
            <section className={styles.wrapper}>
                <article>
                    <img src={randomPoster} alt="moviePoster" />
                </article>
                <article>
                    <img src={ ImageLogo } alt="logo" onClick={ onNavigateHome } />
                    <form onSubmit={ onSubmit }>
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
                        <Button type="submit" color="login">로그인</Button>
                    </form>
                </article>
            </section>
        </main>
    );
};

export default Login;