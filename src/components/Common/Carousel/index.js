import React from "react";

import { IconCaretLeft, IconCaretRight } from "../../../assets/icon";
// import data from "../../../fake.json";
import Card from "../Card";

import StyledSlider from "./carouselStyle";

const Carousel = () => {
  const settings = {
    arrow: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    prevArrow: <IconCaretLeft />,
    nextArrow: <IconCaretRight />,
  };

  return (
    <StyledSlider {...settings}>
      {data.map((movie) => (
        <Card movie={movie} type="carousel" />
      ))}
    </StyledSlider>
  );
};

export default Carousel;
