import React from "react";
import { Button, CheckBox, Input, Toggle } from "../../components";
import styles from "./components.module.scss";

const Component = () => {
    return (
        <main>
            <section className={styles.wrapper}>
                <header>
                    <h1>컴포넌트</h1>
                </header>

                <article>
                    <div>
                        <h2>버튼</h2>
                        <Button />
                    </div>
                    <div>
                        <h2>체크박스</h2>
                        <CheckBox />
                    </div>
                    <div>
                        <h2>입력창</h2>
                        <Input />
                    </div>
                    <div>
                        <h2>토글</h2>
                        <Toggle />
                    </div>
                </article>
            </section>
        </main>
    );
};

export default Component;