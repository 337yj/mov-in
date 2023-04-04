import React from "react";
import { IconCaretLeft, IconCaretRight } from "../../../assets/icon";
import Card from "../Card";

import StyledSlider from "./carouselStyle";

const Carousel = ({ slidesToShow, slidesToScroll, movies }) => {
  const settings = {
    arrow: false,
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: parseInt(slidesToShow),
    slidesToScroll: parseInt(slidesToScroll),
    autoplay: true,
    prevArrow: <IconCaretLeft />,
    nextArrow: <IconCaretRight />,
  };

  return (
    <StyledSlider {...settings}>
      {movies.map((movie) => (
        <Card movie={movie} type="carousel" />
      ))}
    </StyledSlider>
  );
};

export default Carousel;
