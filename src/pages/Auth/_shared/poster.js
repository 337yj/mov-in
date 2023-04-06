import React, { useEffect, useState } from "react";
import { poster1, poster2, poster3 } from "../../../assets/images/poster";

const data = [{ image: poster1 }, { image: poster2 }, { image: poster3 }];

const Poster = () => {
  const posterArr = data.map((movie) => movie.image);
  const posterIdx = Math.floor(Math.random() * posterArr.length);
  const randomPoster = posterArr[posterIdx];
  const [poster, setPoster] = useState(randomPoster);

  //TODO: 시간이 지남에 따라 이미지 바뀌게
  // setInterval(() => {
  //   const posterIdx = Math.floor(Math.random() * posterArr.length);
  //   const randomPoster = posterArr[posterIdx];
  //   //NOTE: posterIdx가 이전과 겹치지 않게
  //   //NOTE: 이미지 바뀔 때 animation
  //   setPoster(randomPoster);
  // }, 1000);

  return (
    <article>
      <img src={poster} alt="moviePoster" />
    </article>
  );
};

export default React.memo(Poster);
