import Header from "../Header/Header";
import styled from "@emotion/styled";
import { Common } from "../../common/variable";
import Slider from "react-slick";
import AsideSlider from "../sideSlider/Slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  customPaging: function () {
    return (
      <a>
        <img src={`/public/NoneprofileImg/profileNone.jpg`} alt="이미지" />
      </a>
    );
  },
  dots: true,
  dotsClass: "slick-dots slick-thumb",
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
};

export default function Detailpage() {
  return (
    <Container>
      <Header />
      <SlideContainer {...settings}>
        {Array.from({ length: 5 }).map((item, index) => {
          return (
            <>
              <SlideItem key={index}>{index}</SlideItem>
            </>
          );
        })}
      </SlideContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${Common.color.backgroundColor};
`;

const SlideContainer = styled(Slider)`
  width: 60%;
  height: 400px;
  background-color: red;
  margin: 0 auto;
  z-index: 999;
`;

const SlideItem = styled.div`
  width: 100%;
  height: 400px;
  background-color: red;
  color: #fff;
`;
