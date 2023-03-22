import React from "react";
import cx from "classnames";
import styles from "./footer.module.scss";

const Footer = ({className, textStyle}) => {

    return (
        <footer className={cx(styles.footer, styles[textStyle])}>
                <div className={cx(styles.container)}>
                    <p>project &nbsp;
                        <a href="https://github.com/337yj/mov-in" className={cx(styles.projectName, styles.nameLink)}>MOV"IN</a>
                    </p>
                    <span>by </span>
                    <span>
                        <a className={cx(styles.nameLink)} href="https://github.com/miyyaa24">김나임</a>
                        <a className={cx(styles.nameLink)} href="https://github.com/minjeongraw34">김민정</a>
                        <a className={cx(styles.nameLink)} href="https://github.com/baeseorim">배서림</a>
                        <a className={cx(styles.nameLink)} href="https://github.com/337yj">이윤정</a>
                    </span>
                    <p>© 2023, mov'in. All rights reserved.</p>
                </div>
        </footer>
    )
}

export default Footer;