import Header from "../Header/Header";
import styled from "@emotion/styled";
import { Common } from "../../common/variable";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../App";
import { BsFillPlayFill } from "react-icons/bs";
import Youtube from "react-youtube";

export default function Detailpage() {
  const selector = useSelector((selector: RootState) => selector.counter1);
  const location = useLocation();
  const DetailGameId = Number(location.pathname.slice(8));
  const findData = selector.gameData.find((item) => {
    return item.id === DetailGameId;
  });
  let screenAndVideosArray: string[] = [];
  if (findData) {
    const screenShotArr = findData.screenshots.split(",");
    if (findData.videos !== "null") {
      const videoUrl = `videoUrl${findData.videos}`;
      screenAndVideosArray = [videoUrl, ...screenShotArr];
    } else {
      screenAndVideosArray = [...screenShotArr];
    }
  }

  const settings = {
    customPaging: function (i: number) {
      if (screenAndVideosArray[i].slice(0, 8) !== "videoUrl") {
        return (
          <SlideControlImgBox>
            <Img
              src={`https://images.igdb.com/igdb/image/upload/t_logo_med/${screenAndVideosArray[i]}.jpg`}
              alt="게임 스크린샷"
            />
          </SlideControlImgBox>
        );
      } else {
        return (
          <SlideControlImgBox>
            <Img
              src={`https://i.ytimg.com/vi_webp/${screenAndVideosArray[0].slice(
                8
              )}/maxresdefault.webp`}
              alt="게임 비디오 이미지"
            />
            <PlaySvg />
          </SlideControlImgBox>
        );
      }
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    speed: 150,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <Container>
      <Header />
      <SlideContainer {...settings}>
        {screenAndVideosArray.map((item, index) => {
          console.log(item.slice(0, 8) === "videoUrl");
          return (
            <>
              {item.slice(0, 8) === "videoUrl" ? (
                <SlideItem key={index}>
                  <YouTubeVideo
                    key={`${item}`}
                    videoId={`${item.slice(8)}`}
                    className="video"
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        rel: 0,
                        modestbranding: 1,
                        controls: 1,
                        disablekb: 0,
                        fs: 1,
                        mute: 1,
                      },
                    }}
                    onEnd={(e) => {
                      e.target.stopVideo(0);
                    }}
                  />
                </SlideItem>
              ) : (
                <SlideItemImageBox>
                  <Img
                    src={`https://images.igdb.com/igdb/image/upload/t_screenshot_big/${item}.jpg`}
                  />
                </SlideItemImageBox>
              )}
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
  height: 600px;
  margin: 0 auto;
  margin-top: 50px;

  & ul {
    overflow-x: scroll;
    white-space: nowrap;
    text-align: left;
    bottom: -130px;
  }

  & ul::-webkit-scrollbar {
    width: 8px;
  }
  & ul::-webkit-scrollbar-thumb {
    height: 75%;
    background: white;
    background: rgba(35, 60, 81, 0.4);
    background-clip: padding box;
    border-top: 4px solid ${Common.color.backgroundColor};
  }
  & ul::-webkit-scrollbar-thumb:hover {
    background-color: #3d6c8d;
  }

  & ul::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1);
  }

  & .slick-dots li {
    margin: 0;
    margin-right: 160px;
  }

  & .slick-dots li:last-child {
    margin-right: 0;
  }

  & .slick-list {
    width: 100%;
    height: 100%;
  }
`;

const SlideItem = styled.div`
  width: 100%;
  height: 600px;
  color: #fff;
`;

const SlideItemImageBox = styled.figure`
  width: 100%;
  height: 100%;
`;

const YouTubeVideo = styled(Youtube)`
  width: 100%;
  height: 100%;
`;

const SlideControlImgBox = styled.a`
  display: inline-block;
  width: 160px;
  height: 90px;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const PlaySvg = styled(BsFillPlayFill)`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  transform: translate(-50%, -50%);
`;
