import React from "react";
import { IconCaretLeft, IconCaretRight } from "../../../assets/icon";
import Card from "../Card";
import SubCard from "../Carousel/Card";

import StyledSlider from "./carouselStyle";

const Carousel = ({ slidesToShow, slidesToScroll, movies }) => {
  const settings = {
    arrow: false,
    dots: false,
    speed: 800,
    slidesToShow: parseInt(slidesToShow),
    slidesToScroll: parseInt(slidesToScroll),
    autoplay: true,
    prevArrow: <IconCaretLeft />,
    nextArrow: <IconCaretRight />,
  };

  return (
    <>
      {slidesToShow !== "5" ? (
        <StyledSlider {...settings}>
          {movies.map((movie) => (
            <Card movie={movie} type="carousel" />
          ))}
        </StyledSlider>
      ) : (
        <StyledSlider {...settings}>
          {movies.map((movie) => (
            <SubCard movie={movie} />
          ))}
        </StyledSlider>
      )}
    </>
  );
};

export default Carousel;
