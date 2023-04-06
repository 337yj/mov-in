import React from "react";
import { IconCaretLeft, IconCaretRight } from "../../../assets/icon";
import Card from "../Card";
//import Card from "../Carousel/Card"

import StyledSlider from "./carouselStyle";
import styles from "./carousel.module.scss";

const Carousel = ({ slidesToShow, slidesToScroll, movies }) => {
  const settings = {
    arrow: false,
    dots: false,
    // infinite: true,
    speed: 700,
    slidesToShow: parseInt(slidesToShow),
    slidesToScroll: parseInt(slidesToScroll),
    // autoplay: true,
    // slidesToShow: 4,
    prevArrow: <IconCaretLeft />,
    nextArrow: <IconCaretRight />,
  };

  //NOTE: 새로운 카드 생성 - 방법 1 => 추천~
  //NOTE: className을 여러개 만들어서 적용  - 방법 2

  return (
    <StyledSlider {...settings}>
      {movies.map((movie) => (
        <Card
          className={styles.img}
          movie={movie}
          hoverCardClassName={styles.hover}
          // wrapperClassName={~~~}
          type="carousel"
        />
      ))}
    </StyledSlider>
  );
};

export default Carousel;
