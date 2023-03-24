// 참고 : slick 라이브러리 소개 https://react-slick.neostack.com/
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// 참고 : styled components 소개 https://styled-components.com/
// slick css 관리를 위함
import styled from "styled-components";

const StyledSlider = styled(Slider)`
    .slick-prev {
        left: 0px;
        z-index: 10;
        scale: 200%;
        margin-right: 20px;
    }

    .slick-next {
        right:0;
        scale: 200%;
    }

    .slick-list {
        width: 1400px; // 구체적으로 안 넣으니까 제대로 안 뜸
        margin: 10px 14px;
    }
`;

export default StyledSlider;