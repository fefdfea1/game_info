import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { retrunDataType } from "../../dataFetch/getGameData";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, cachData, pageUp } from "../../App";
import { getNextData } from "./getNextData/getNextData";
import { IconType } from "react-icons";
import MainPageButton from "./MainPageButton";
import YoutubeVideoPlayer from "./YoutubeVideoPlayer";
import ShowScreenShot from "./ShowScreenShot";
import LoadingSpinner from "./LoadingSpinner";
import { changeSvg } from "./changeSvg";

export interface getDataType {
  returnData: retrunDataType[];
  page: number;
}

type propsType = {
  searchData: retrunDataType[];
  setSearch: React.Dispatch<React.SetStateAction<retrunDataType[]>>;
};

export type copyType = {
  checksum: string;
  cover: string;
  first_release_date: number;
  game_modes: string;
  id: number;
  platforms: IconType[] | string[];
  screenshots: string;
  summary: string;
  videos: string;
  genres: string[];
  name: string;
  total_rating: number | string;
};

export type setPrveRecordType = {
  gameTitle: string;
  coverImg: string;
  gameId: number;
};

const mouseOverEvent = (
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  overState: React.Dispatch<React.SetStateAction<boolean>>,
  setIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  const target = event.target as HTMLDivElement;
  const indexData = target.dataset.index;
  setIndex(Number(indexData));
  overState(true);
};

const mouseLeaveEvent = (
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  overState: React.Dispatch<React.SetStateAction<boolean>>,
  setIndex: React.Dispatch<React.SetStateAction<number>>,
  Index: number
) => {
  const target = event.target as HTMLAnchorElement;
  const rootElement = target.closest(".videoAreaContainer ");
  if (rootElement !== null) {
    const imgBox = rootElement.childNodes[Index].childNodes[0].childNodes[0]
      .lastChild as HTMLDivElement;
    if (imgBox !== null) {
      imgBox.style.opacity = "1";
    }
  }
  setIndex(-1);
  overState(false);
};

const clickEvent = (target: HTMLElement) => {
  if (!target.classList.contains("activeButton")) {
    const coverImg = target.childNodes[0].childNodes[1]
      .childNodes[0] as HTMLImageElement;
    const PTag = target.childNodes[2].childNodes[0] as HTMLParagraphElement;
    const buttonTag = target.childNodes[3] as HTMLButtonElement;
    const gameId = Number(buttonTag.dataset.gameid);
    const gameTitle = PTag.innerText;
    const setDataType: setPrveRecordType = {
      gameTitle,
      coverImg: coverImg.src,
      gameId,
    };
    const getItem = sessionStorage.getItem("prevData");
    if (getItem !== null) {
      const parseData = JSON.parse(getItem);
      //게임 리스트 중복 없애기
      const removeRedundancy = [...parseData, { ...setDataType }].filter(
        (object, index, arr) => {
          return (
            arr.findIndex((item) => item.gameId === object.gameId) === index
          );
        }
      );

      sessionStorage.setItem("prevData", JSON.stringify(removeRedundancy));
    } else {
      sessionStorage.setItem("prevData", JSON.stringify([{ ...setDataType }]));
    }
  }
};

const mouseClickEvent = (
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) => {
  const target = event.target as HTMLElement;
  if (!target.classList.contains("activeButton")) {
    clickEvent(target);
  } else {
    event.preventDefault();
  }
};

export default function MainPageVideo(props: propsType) {
  const [OverState, setOverState] = useState<boolean>(false);
  const [OverDomIndex, setIndex] = useState<number>(-1);
  const selector = useSelector((state: RootState) => state.counter1);
  const dispatch = useDispatch();
  const getTarget = useRef<HTMLDivElement>(null);
  const coverImgBox = useRef(null);

  useEffect(() => {
    if (selector.gameData.length < 1) {
      fetchNextData();
    } else {
      //기존의 아이콘 이름만 가져와 매칭되는 아이콘이름을 태그로 다시 반환
      const updatedGameData = selector.gameData.map((item) => {
        const changePlatformTag = item.platforms.map((platForm) => {
          return changeSvg(platForm);
        });

        return {
          ...item,
          platforms: changePlatformTag,
        };
      });

      props.setSearch(updatedGameData);
    }
  }, []);

  //react-intersection-observer 라이브러리는 원하는 대로 구현이 힘들어 직접 구현
  useEffect(() => {
    const observeRef = getTarget.current;
    const observer = new IntersectionObserver((entry, observer) => {
      if (entry[0].isIntersecting) {
        if (getTarget.current) {
          const target = getTarget.current as HTMLDivElement;
          target.style.opacity = "1";
          observer.unobserve(getTarget.current);
          fetchNextData();
        }
      } else {
        if (!entry[0].isIntersecting) {
          if (getTarget.current) {
            const target = getTarget.current as HTMLDivElement;
            target.style.opacity = "0";
          }
        }
      }
    });

    if (getTarget.current && props.searchData.length >= 1) {
      observer.observe(getTarget.current);
    }

    return () => {
      if (observeRef !== null && props.searchData.length >= 1) {
        observer.unobserve(observeRef);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchData]);

  const fetchNextData = async () => {
    const { page, returnData }: getDataType = await getNextData(
      selector.Nowunix,
      selector.page,
      selector.limit,
      selector.nowDataType
    );
    const copyData: retrunDataType[] = JSON.parse(JSON.stringify(returnData));
    if (returnData.length >= 1) {
      const updatedGameData = copyData.map((item) => {
        const changePlatformTag = item.platforms.map((platForm) => {
          return changeSvg(platForm);
        });

        return {
          ...item,
          platforms: changePlatformTag,
        };
      });

      const newData = [...selector.gameData, ...returnData];
      const settingData = [...props.searchData, ...updatedGameData];

      props.setSearch(settingData);
      dispatch(cachData(newData));
      dispatch(pageUp(page));
    }
  };

  return (
    <>
      <VideoAreaContainer className="videoAreaContainer">
        {props.searchData.length >= 1 &&
          props.searchData.map((item, index) => {
            return (
              <VideoContainer className="videoContainer" key={`${index}`}>
                <LinkTag
                  to={`/detail/${item.id}`}
                  data-index={index}
                  onMouseOver={(event) => {
                    mouseOverEvent(event, setOverState, setIndex);
                  }}
                  onClick={(event) => {
                    mouseClickEvent(event);
                  }}
                  onMouseLeave={(event) => {
                    mouseLeaveEvent(event, setOverState, setIndex, index);
                  }}
                >
                  <VideoBox className="videoBox">
                    {OverState &&
                    index === OverDomIndex &&
                    item.videos !== "null" ? (
                      <YoutubeVideoPlayer
                        item={item}
                        index={index}
                        OverState={OverState}
                        OverDomIndex={OverDomIndex}
                        coverImgBox={coverImgBox}
                      />
                    ) : (
                      <ShowScreenShot
                        item={item}
                        index={index}
                        OverState={OverState}
                        OverDomIndex={OverDomIndex}
                        coverImgBox={coverImgBox}
                      />
                    )}
                    {item.cover !== "null" ? (
                      <CoverImgBox className="coverImgBox" ref={coverImgBox}>
                        <CoverImg
                          src={`${item.cover}`}
                          alt="커버 이미지"
                          className="coverImg"
                        />
                        {OverState &&
                        OverDomIndex === index &&
                        item.videos !== "null" ? (
                          <LoadingSpinnerDom>
                            <Spinner />
                          </LoadingSpinnerDom>
                        ) : null}
                      </CoverImgBox>
                    ) : (
                      <NonVideoImgbox className="NonVideoImgbox">
                        <NonVideoImg src={`img/OIP.jpg`} />
                        {OverState &&
                        OverDomIndex === index &&
                        item.videos !== "null" ? (
                          <LoadingSpinner
                            ref={getTarget}
                            position="absolute"
                            top="0"
                            left="0"
                          />
                        ) : null}
                      </NonVideoImgbox>
                    )}
                  </VideoBox>
                  <GameTagBox className="gameTag">
                    <PlatformBox>
                      {item.platforms.map((result, index) => (
                        <PlatformArea key={index}>{result}</PlatformArea>
                      ))}
                    </PlatformBox>
                    <Score>
                      {item.total_rating !== "null"
                        ? Math.floor(Number(item.total_rating))
                        : "점수없음"}
                    </Score>
                  </GameTagBox>
                  <GameTitleBox className="gameTitle">
                    <p>{item.name}</p>
                  </GameTitleBox>
                  <MainPageButton gameID={item.id} />
                </LinkTag>
              </VideoContainer>
            );
          })}
      </VideoAreaContainer>
      <LoadingSpinner ref={getTarget} position="static" left="0" top="0" />
    </>
  );
}

const VideoAreaContainer = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 400px));
  grid-template-rows: repeat(auto-fill, minmax(300px, auto));
  flex-wrap: wrap;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 3%;
  gap: 0 2%;
  justify-content: center;
  align-items: center;
`;

const VideoContainer = styled.div`
  box-sizing: border-box;
  margin: 70px 1%;
  overflow: hidden;
  border-radius: 16px;
  border: 3px solid black;
  &:hover a .videoBox {
    width: 100%;
    height: 400px;
  }

  &:hover a .videoBox iframe {
    height: 350px;
  }

  &:hover a .coverImgBox {
    height: 350px;
  }

  &:hover a .videoBox .NonVideoImgbox {
    height: 350px;
  }

  @media (max-width: 740px) {
    width: 90%;
  }
`;

const LinkTag = styled(Link)`
  width: 100%;
  height: 100%;
  display: block;
  padding: 0 0 20px 0;
`;

const VideoBox = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  z-index: 1;
  margin: 0 auto;
  transition: all 0.5s;
  pointer-events: none;

  & iframe {
    width: 100%;
    transition: all 0.5s;
  }
`;

const GameTagBox = styled.div`
  width: 100%;
  color: var(--fontWhite);
  display: flex;
  justify-content: space-between;
  padding: 0 27px;
  box-sizing: border-box;
  font-size: 14px;
  text-align: right;
  pointer-events: none;
`;

const GameTitleBox = styled.div`
  font-size: 20px;
  color: var(--fontWhite);
  margin-top: 30px;
  text-align: center;
  pointer-events: none;
`;

const NonVideoImgbox = styled.div`
  width: 100%;
  height: 270px;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  transition: all 0.5s;
`;

const NonVideoImg = styled.img`
  width: 100%;
  height: 100%;
`;

const CoverImgBox = styled.div`
  width: 100%;
  height: 270px;
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  display: flex;
  transition: all 0.5s;

  &.opacityOut {
    opacity: 0;
  }
`;

const CoverImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Score = styled.span`
  min-width: 32px;
  height: 100%;
  border-color: rgba(109, 200, 73, 0.4);
  color: var(--ScroeFontColor);
  padding: 6px 0;
  text-align: center;
  border-radius: 4px;
  border: 1px solid;
  font-weight: bold;
  pointer-events: none;
`;

const PlatformBox = styled.div`
  width: 200px;
  text-align: left;
`;

const PlatformArea = styled.span`
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
`;

//props로 분리하면 다음 게임 저오를 불러올 수 없는 오류가 발생해 따로 뺌

const LoadingSpinnerDom = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  left: 0;
  top: 0;
  border: 5px solid #ccc;
  border-top-color: #888;
  border-radius: 50%;
  animation: spin 1s infinite linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
