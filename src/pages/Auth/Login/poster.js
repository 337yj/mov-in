import React from "react";
import { useNavigate } from "react-router-dom";
// import data from "../../../fake.json";

const Poster = () => {
  // 이미지 누르면 디테일로 이동
  const navigate = useNavigate();

  const onNavigateDetail = () => {
    navigate(`/detail`);
  };

  // 랜덤 영화 포스터
  // 가짜 데이터 내의 이미지 화질이 낮아서 깨짐
  // const posterArr = data.map((movie) => movie.image);
  // const posterIdx = Math.floor(Math.random() * posterArr.length);
  // const randomPoster = posterArr[posterIdx];

  return (
    <article>
      {/* <img src={randomPoster} onClick={onNavigateDetail} alt="moviePoster" /> */}
    </article>
  );
};

// 이메일, 비밀 번호 입력 시 같이 렌더링 되지 않음
export default React.memo(Poster);
