import React from "react";
import Card from "../Card";
import { IconCaretLeft, IconCaretRight } from "../../../assets/icon";
import data from "../../../fake.json";
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
                {data.map(movie => <Card movie={movie} />)}
            </StyledSlider>
    );
};

export default Carousel;