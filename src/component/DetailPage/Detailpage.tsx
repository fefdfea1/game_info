import Header from "../Header/Header";
import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLocation } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import Youtube from "react-youtube";
import { getGameInfo } from "./getDetailGameInfo";
import { useEffect, useState, useRef } from "react";
import { makeChart } from "./paintCircleCart";
import { createComment, getCommentData, removeComment } from "./CommentScript";
import { appAuth } from "../../common/fireBaseSetting";
type gameInfoType = {
  metaCritic: number;
  first_release_date: string;
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

export type CommentType = {
  Comment: string;
  uid: string;
  name: string;
  id: string;
  time: number;
};

const showMore = (AboutBoxRef: React.RefObject<HTMLDivElement>) => {
  if (AboutBoxRef.current) {
    if (AboutBoxRef.current.classList.contains("hide")) {
      AboutBoxRef.current.style.height = "auto";
      AboutBoxRef.current.style.overflow = "visible";
      AboutBoxRef.current.classList.add("show");
      AboutBoxRef.current.classList.remove("hide");
    } else if (AboutBoxRef.current.classList.contains("show")) {
      AboutBoxRef.current.style.height = "230px";
      AboutBoxRef.current.style.overflow = "hidden";
      AboutBoxRef.current.classList.add("hide");
      AboutBoxRef.current.classList.remove("show");
    }
  }
};

const slideState = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  setButtonState: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const target = event.target as HTMLButtonElement;
  const slider = target.closest("div");
  if (slider?.classList.contains("hide")) {
    setButtonState(true);
  } else {
    setButtonState(false);
  }
};

export default function Detailpage() {
  const [DetailGameInfo, setGameInfo] = useState<gameInfoType>();
  const [MoreButtonState, setMoreState] = useState<boolean>(false);
  const [CommentList, setCommentList] = useState<CommentType[]>([]);
  const [sliderButtonClick, setButtonState] = useState<boolean>(false);
  const location = useLocation();
  const CircleMetaCriticRef = useRef<HTMLDivElement>(null);
  const CircleUserRatingRef = useRef<HTMLDivElement>(null);
  const AboutBoxRef = useRef<HTMLDivElement>(null);
  const desc = useRef<HTMLParagraphElement>(null);
  const userUid = appAuth.currentUser?.uid;
  useEffect(() => {
    let metaTimeId: NodeJS.Timer;
    let totalRatingTimeId: NodeJS.Timer;
    const getGameInfoAsync = async () => {
      const getGameData = await getGameInfo(location);
      const metaCritic = getGameData.metaCritic;
      const totalRating = Math.floor(getGameData.total_rating);
      setGameInfo(getGameData);
      const timeId1 = makeChart(metaCritic, CircleMetaCriticRef, "red");
      const timeId2 = makeChart(totalRating, CircleUserRatingRef, "yellow");
      //2개중 하나만 있는 경우가 있어 따로 if문을 사용하여 검사
      if (timeId1) {
        metaTimeId = timeId1;
      }
      if (timeId2) {
        totalRatingTimeId = timeId2;
      }
      if (getGameData.summary.length >= 400) {
        setMoreState(true);
      }
    };

    getGameInfoAsync();

    getCommentData(location, setCommentList);
    return () => {
      //사용자가 차트가 완전히 만들어지기 전에 뒤로가기를 하였을때를 위해
      if (metaTimeId || totalRatingTimeId) {
        clearInterval(metaTimeId);
        clearInterval(totalRatingTimeId);
      }
    };
  }, []);
  let screenAndVideosArray: string[] = [];

  if (DetailGameInfo) {
    const screentShotArr = DetailGameInfo.screenshots.split(",");
    const videoArr = DetailGameInfo.video_id.split(",");
    if (DetailGameInfo.video_id !== "") {
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
      <SubMitButotnPositionBox className={sliderButtonClick ? "open" : "hide"}>
        <SidecommentBox>
          <SideActiveButton
            onClick={(event) => {
              slideState(event, setButtonState);
            }}
          >
            <LeftArrow className="Arrow" />
          </SideActiveButton>
          <WriteComment
            method="post"
            action="#"
            onSubmit={(evnet) => {
              createComment(evnet, location, CommentList, setCommentList);
            }}
          >
            <input type="text" />
            <SubMitButton type="submit">등록하기</SubMitButton>
          </WriteComment>
          {CommentList.map((item) => {
            return (
              <>
                {userUid === item.uid ? (
                  <>
                    <CommentArea data-Id={item.id}>
                      <div>
                        <p>{item.name}</p>
                        <p>{item.Comment}</p>
                      </div>
                      <DeleteComment
                        onClick={(event) => {
                          removeComment(
                            event,
                            location,
                            setCommentList,
                            CommentList
                          );
                        }}
                      >
                        X
                      </DeleteComment>
                    </CommentArea>
                  </>
                ) : (
                  <>
                    <CommentArea data-Id={item.id}>
                      <div>
                        <p>{item.name}</p>
                        <p>{item.Comment}</p>
                      </div>
                    </CommentArea>
                  </>
                )}
              </>
            );
          })}
        </SidecommentBox>
      </SubMitButotnPositionBox>
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
            {DetailGameInfo && DetailGameInfo?.metaCritic !== undefined ? (
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
            {DetailGameInfo && DetailGameInfo?.total_rating !== undefined ? (
              <Score>{Math.floor(DetailGameInfo.total_rating)}점</Score>
            ) : (
              <Score>점수없음</Score>
            )}
          </SmallCircle>
        </CircleUserRating>
      </CircleChartContainer>
      <GameDescriptionArea>
        <ButtonPositionBox>
          <AboutBox ref={AboutBoxRef} className="hide">
            <DescriptionTitle>About</DescriptionTitle>
            {DetailGameInfo?.summary ? (
              <GameDescription ref={desc} className="desc">
                {DetailGameInfo.summary}
              </GameDescription>
            ) : (
              <GameDescription>정보 없음</GameDescription>
            )}
          </AboutBox>
          {MoreButtonState && (
            <ShowMore
              onClick={() => {
                showMore(AboutBoxRef);
              }}
            >
              더 보기
            </ShowMore>
          )}
        </ButtonPositionBox>
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
          <DetailIInfoTitle>Game's Similar</DetailIInfoTitle>
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
  background-color: var(--backgroundColor);
  padding-bottom: 90px;
`;

const SlideContainer = styled(Slider)`
  width: 65%;
  max-width: 1600px;
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
    border-top: 4px solid var(--backgroundColor);
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

  & .slick-track {
    height: 100%;
  }

  & .slick-slide div {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 850px) {
    width: 90%;
  }
`;

const SlideItem = styled.div`
  width: 100%;
  height: 600px;
  color: var(--fontWhite);
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
  color: var(--fontWhite);
  transform: translate(-50%, -50%);
`;

const CircleChartContainer = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  margin: 270px auto 0 auto;
  padding: 0 200px;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    width: 80%;
  }

  @media (max-width: 840px) {
    width: 100%;
    padding: 0 100px;
  }
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

  @media (max-width: 1200px) {
    width: 130px;
    height: 130px;
  }
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
  @media (max-width: 1200px) {
    width: 130px;
    height: 130px;
  }
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

  @media (max-width: 1200px) {
    width: 60px;
    height: 60px;
  }
`;

const Description = styled.p`
  position: absolute;
  top: -78px;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--fontWhite);
  font-size: 25px;
  white-space: nowrap;

  @media (max-width: 1200px) {
    font-size: 20px;
  }
`;

const Score = styled.span`
  font-size: 18px;
  font-weight: 900;

  @media (max-width: 1200px) {
    font-size: 16px;
  }
`;

const ButtonPositionBox = styled.div`
  width: 100%;
  position: relative;
`;

const AboutBox = styled.div`
  width: 100%;
  height: 210px;
  overflow: hidden;
  position: relative;
`;

const DescriptionTitle = styled.p`
  font-size: 40px;
  font-weight: bold;
`;

const GameDescriptionArea = styled.div`
  width: 50%;
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 102px;
  color: var(--fontWhite);

  @media (max-width: 840px) {
    width: 90%;
  }
`;

const GameDetailInfo = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
`;

const DetailInfoBox = styled.div`
  width: 100%;
  line-height: 1.8;
  margin-top: 40px;

  &:first-child {
    margin-top: 0;
  }
`;

const DetailIInfoTitle = styled.p`
  color: var(--detailInfoTitleFontColor);
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

const GameDescription = styled.p`
  width: 100%;
  line-height: 1.5;
  font-size: 20px;
  text-overflow: ellipsis;
`;

const GameSimilarInfo = styled.div`
  width: 100%;
  font-size: 20px;
  line-height: 1.6;
  margin-top: 90px;
`;

const ShowMore = styled.button`
  position: absolute;
  bottom: -25px;
  left: 0;
  font-size: 13px;
  color: var(--fontWhite);
  border: 0;
  background-color: var(--backgroundColor);
  cursor: pointer;
`;

const Similar = styled.span`
  font-size: 20px;
`;

const SubMitButotnPositionBox = styled.div`
  width: 26%;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  transform: translateX(100%);
  transition: all 0.5s;

  &.open {
    transform: translateX(0%);
  }

  &.open .Arrow {
    transform: rotate(45deg);
    right: 7px;
  }

  @media (max-width: 1200px) {
    width: 35%;
  }

  @media (max-width: 840px) {
    width: 40%;
  }
`;

const SidecommentBox = styled.aside`
  width: 100%;
  height: 100%;
  background-color: var(--colorWhite);
  overflow-y: auto;
`;

const CommentArea = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid var(--fontBlack);
  line-height: 1.5;
  box-sizing: border-box;
  color: var(--fontBlack);
`;

const DeleteComment = styled.button`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: auto;

  background-color: transparent;
  color: var(--fontBlack);
`;

const WriteComment = styled.form`
  width: 100%;
  height: 50px;
  display: flex;
  & input {
    width: 100%;
    height: 100%;
    padding: 10px 15px;
    box-sizing: border-box;
  }
`;

const SubMitButton = styled.button`
  width: 60px;
  height: 50px;
  padding: 5px 10px;
  background-color: var(--colorBlack);
  color: var(--fontWhite);
  font-weight: bold;
  cursor: pointer;

  @media (max-width: 740px) {
    font-size: 13px;
  }
`;

const SideActiveButton = styled.button`
  width: 30px;
  height: 50px;
  position: absolute;
  left: -30px;
  top: 50%;
  transform: translateY(-50%);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  background-color: var(--colorWhite);
  cursor: pointer;
`;

const LeftArrow = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0;
  top: 25%;
  border-top: 3px solid var(--backgroundColor);
  border-right: 3px solid var(--backgroundColor);
  transform: rotate(225deg);
  transition: transform 0.5s;
  pointer-events: none;
`;
