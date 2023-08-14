import { retrunDataType } from "../../dataFetch/getGameData";
import Slider from "react-slick";
import styled from "@emotion/styled";
import { useRef } from "react";
import LoadingSpinner from "./LoadingSpinner";

type propsType = {
  item: retrunDataType;
  index: number;
  OverState: boolean;
  OverDomIndex: number;
  coverImgBox: React.RefObject<HTMLDivElement>;
};

const settings = {
  autoplay: true,
  infinite: true,
  speed: 100,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 2,
  arrows: false,
};

export default function ShowScreenShot(props: propsType) {
  const target = props.coverImgBox.current as HTMLDivElement;
  const screenShotArr = props.item.screenshots.split(",");
  const baseUrl = "https://images.igdb.com/igdb/image/upload/t_cover_big";
  const getTarget = useRef<HTMLDivElement>(null);
  if (target) {
    const videoContainer = target.closest(".videoAreaContainer");
    if (videoContainer) {
      const currentTarget = videoContainer.childNodes[
        props.index
      ] as HTMLElement;
      if (currentTarget) {
        const getCurrentCoverImgBox = currentTarget.querySelector(
          ".coverImgBox"
        ) as HTMLDivElement;
        if (props.index === props.OverDomIndex) {
          getCurrentCoverImgBox.style.opacity = "0";
        } else {
          getCurrentCoverImgBox.style.opacity = "1";
        }
      }
    }
  }
  return (
    <>
      {props.OverDomIndex === props.index && (
        <LoadingSpinner ref={getTarget} position="absolute" top="0" left="0" />
      )}
      {/* 자연스러운 애니메이션을 위해 조건부 랜더링을 하지 않음 */}
      {props.OverDomIndex === props.index ? (
        <SliderContainer
          {...settings}
          className={props.OverDomIndex === props.index ? "active" : ""}
        >
          {screenShotArr.map((item, index) => {
            return (
              <div key={index}>
                <SliderImg src={`${baseUrl}/${item}.jpg`} alt="게임 스크린샷" />
              </div>
            );
          })}
        </SliderContainer>
      ) : null}
    </>
  );
}

const SliderContainer = styled(Slider)`
  width: 100%;
  height: 270px;
  transition: all 0.5s;

  &.active {
    height: 350px;
  }

  & .slick-list {
    width: 100%;
    height: 100%;
  }

  & .slick-track {
    height: 100%;
  }

  & .slick-slide div {
    width: 100%;
    height: 100%;
  }

  & .slick-dots {
    bottom: 6px;
  }
`;

const SliderImg = styled.img`
  width: 100%;
  height: 100%;
`;
