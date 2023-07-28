import Header from "../Header/Header";
import styled from "@emotion/styled";
import { Common } from "../../common/variable";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import Youtube from "react-youtube";
import { getGameInfo } from "./getDetailGameInfo";
import { useEffect, useState, useRef } from "react";
import { makeChart } from "./paintCircleCart";
type gameInfoType = {
  metaCritic: number;
  first_release_date: number;
  game_modes: string;
  genres: string;
  image_id: string;
  name: string;
  platform: string;
  screenshots: string;
  summary: string;
  total_rating: number;
  video_id: string;
  similar_games: string;
};

export default function Detailpage() {
  const [DetailGameInfo, setGameInfo] = useState<gameInfoType>();
  const location = useLocation();
  const CircleMetaCriticRef = useRef<HTMLDivElement>(null);
  const CircleUserRatingRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const getGameInfoAsync = async () => {
      const getGameData = await getGameInfo(location);
      console.log(getGameData);
      const metaCritic = getGameData.metaCritic;
      const totalRating = Math.floor(getGameData.total_rating);
      setGameInfo(getGameData);
      makeChart(metaCritic, CircleMetaCriticRef, "red");
      makeChart(totalRating, CircleUserRatingRef, "yellow");
    };
    getGameInfoAsync();
  }, []);
  let screenAndVideosArray: string[] = [];

  if (DetailGameInfo) {
    const screentShotArr = DetailGameInfo.screenshots.split(",");
    const videoArr = DetailGameInfo.video_id.split(",");
    if (DetailGameInfo.video_id !== null) {
      screenAndVideosArray = [...videoArr, ...screentShotArr];
    } else {
      screenAndVideosArray = [...screentShotArr];
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
              src={`https://i.ytimg.com/vi_webp/${screenAndVideosArray[i].slice(
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
      <CircleChartContainer>
        <CircleMetaCritic ref={CircleMetaCriticRef}>
          <SmallCircle>
            <Description>메타크리틱 점수</Description>
            {DetailGameInfo?.metaCritic !== undefined ? (
              <Score>{Math.floor(DetailGameInfo.metaCritic)}점</Score>
            ) : (
              <Score>점수없음</Score>
            )}
          </SmallCircle>
        </CircleMetaCritic>

        <CircleUserRating ref={CircleUserRatingRef}>
          <SmallCircle>
            <Description>
              사용자
              <br /> 평가
            </Description>
            {DetailGameInfo?.metaCritic !== undefined ? (
              <Score>{Math.floor(DetailGameInfo.total_rating)}점</Score>
            ) : (
              <Score>점수없음</Score>
            )}
          </SmallCircle>
        </CircleUserRating>
      </CircleChartContainer>
      <GameDescriptionArea>
        <DescriptionTitle>About</DescriptionTitle>
        {DetailGameInfo?.summary ? (
          <GameDescription>{DetailGameInfo.summary}</GameDescription>
        ) : (
          <GameDescription>정보 없음</GameDescription>
        )}
        <GameDetailInfo>
          <GameDetailLeft>
            <DetailInfoBox>
              <DetailIInfoTitle>platforms</DetailIInfoTitle>
              {DetailGameInfo?.platform ? (
                <DetailInfoContent>{DetailGameInfo.platform}</DetailInfoContent>
              ) : (
                <DetailInfoContent>정보 없음</DetailInfoContent>
              )}
            </DetailInfoBox>
            <DetailInfoBox>
              <DetailIInfoTitle>Genre</DetailIInfoTitle>
              {DetailGameInfo?.genres ? (
                <DetailInfoContent>{DetailGameInfo.genres}</DetailInfoContent>
              ) : (
                <DetailInfoContent>정보 없음</DetailInfoContent>
              )}
            </DetailInfoBox>
          </GameDetailLeft>
          <GameDetailRight>
            <DetailInfoBox>
              <DetailIInfoTitle>MetaScore</DetailIInfoTitle>
              {DetailGameInfo?.metaCritic ? (
                <DetailInfoContent>
                  {DetailGameInfo.metaCritic}
                </DetailInfoContent>
              ) : (
                <DetailInfoContent>정보 없음</DetailInfoContent>
              )}
            </DetailInfoBox>
            <DetailInfoBox>
              <DetailIInfoTitle>Release Date</DetailIInfoTitle>
              {DetailGameInfo?.first_release_date ? (
                <DetailInfoContent>
                  {DetailGameInfo.first_release_date}
                </DetailInfoContent>
              ) : (
                <DetailInfoContent>정보 없음</DetailInfoContent>
              )}
            </DetailInfoBox>
          </GameDetailRight>
        </GameDetailInfo>
        <GameSimilarInfo>
          <DetailIInfoTitle>Similar Games</DetailIInfoTitle>
          {DetailGameInfo?.similar_games ? (
            <Similar>{DetailGameInfo?.similar_games}</Similar>
          ) : (
            <Similar>정보 없음</Similar>
          )}
        </GameSimilarInfo>
      </GameDescriptionArea>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${Common.color.backgroundColor};
  padding-bottom: 90px;
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

const CircleChartContainer = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  margin: 270px auto 0 auto;
  padding: 0 200px;
  box-sizing: border-box;
`;

const CircleMetaCritic = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: 0.3s;
`;

const CircleUserRating = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: 0.3s;
`;
const SmallCircle = styled.p`
  width: 80px;
  height: 80px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  text-align: center;
`;

const Description = styled.p`
  position: absolute;
  top: -78px;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 25px;
  white-space: nowrap;
`;

const Score = styled.span`
  font-size: 18px;
  font-weight: 900;
`;

const DescriptionTitle = styled.p`
  position: absolute;
  top: -50px;
  left: 0%;
  font-size: 40px;
  font-weight: bold;
`;

const GameDescriptionArea = styled.div`
  width: 50%;
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 102px;
  color: #fff;
`;

const GameDetailInfo = styled.div`
  width: 100%;
  margin-top: 90px;
  display: flex;
`;

const DetailInfoBox = styled.div`
  width: 100%;
  line-height: 1.8;
  margin-top: 90px;

  &:first-child {
    margin-top: 0;
  }
`;

const DetailIInfoTitle = styled.p`
  color: #3e4648;
  font-weight: 700;
  font-size: 27px;
`;

const DetailInfoContent = styled.p`
  font-size: 17px;
  font-weight: 800;
`;

const GameDetailLeft = styled.div`
  width: 50%;
`;

const GameDetailRight = styled.div`
  width: 50%;
`;

const GameDescription = styled.div`
  width: 100%;
  height: 100%;
  line-height: 1.5;
  font-size: 20px;
  font-weight: 00;
`;

const GameSimilarInfo = styled.div`
  width: 100%;
  font-size: 20px;
  line-height: 1.6;
  margin-top: 90px;
`;

const Similar = styled.span`
  font-size: 20px;
`;

const RecommendComputerspecs = styled.div``;
