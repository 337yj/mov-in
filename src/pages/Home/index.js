import React, {useState} from 'react';
import {Button} from '../../components';
import styles from './home.module.scss'

const Home = () => {

    const onClickWarning = () => {
        alert("탈퇴하시겠습니까?")
    }

   const [isSelect, setIsSelected] = useState(false);
   function handleClick() {
    setIsSelected(true);
   } 


    return (
        <main>
            <div>
            <Button>저장</Button>
            <Button color="pink" onClick={onClickWarning}>탈퇴</Button>
            <Button color="yellow">보기</Button>
            <Button color="secondary">취소</Button>
            </div>
            <div className={styles.indigoBg}>
                <Button color="indigo">♡ 1,231</Button>
            </div>
            <Button color="login">로그인</Button>
            
            <Button color="selectTag">연기력</Button>
            <Button color="miniTag">욕설/비방</Button>
        </main>
    );
};

export default Home;