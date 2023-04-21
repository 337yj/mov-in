import React from "react";
import { IconCaretLeft, IconCaretRight } from "../../../assets/icon";
import Card from "../Card";
import SubCard from "../Carousel/Card";

import StyledSlider from "./carouselStyle";

const Carousel = ({ slidesToShow, slidesToScroll, movies }) => {
  const settings = {
    arrow: false,
    dots: false,
    speed: 3000,
    infinite: true,
    slidesToShow: parseInt(slidesToShow),
    slidesToScroll: parseInt(slidesToScroll),
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: <IconCaretLeft />,
    nextArrow: <IconCaretRight />,
  };

  return (
    <>
      {slidesToShow !== "5" ? (
        <StyledSlider {...settings}>
          {movies.map((movie) => (
            <Card movie={movie} type="carousel" key={movie.id} />
          ))}
        </StyledSlider>
      ) : (
        <StyledSlider {...settings}>
          {movies.map((movie) => (
            <SubCard movie={movie} key={movie.id} />
          ))}
        </StyledSlider>
      )}
    </>
  );
};

export default Carousel;
