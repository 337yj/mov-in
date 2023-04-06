import React from "react";
import { poster1, poster2, poster3 } from "../../../assets/images/poster";

const data = [{ image: poster1 }, { image: poster2 }, { image: poster3 }];

const Poster = () => {
  const posterArr = data.map((movie) => movie.image);
  const posterIdx = Math.floor(Math.random() * posterArr.length);
  const randomPoster = posterArr[posterIdx];

  return (
    <article>
      <img src={randomPoster} alt="moviePoster" />
    </article>
  );
};

export default React.memo(Poster);
