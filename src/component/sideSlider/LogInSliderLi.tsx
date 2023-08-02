import styled from "@emotion/styled";
import { MdSort } from "react-icons/md";
import { BiVideoRecording } from "react-icons/bi";
import { LiaGamepadSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";
import { BsSun } from "react-icons/bs";
import { Dispatch, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, initType, pageUp, cachData, changeType } from "../../App";
import { getNextData } from "../MainPage/getNextData/getNextData";
import { AnyAction } from "redux";
import { getDataType } from "../MainPage/MainPageVideo";
import { retrunDataType } from "../../dataFetch/getGameData";
import { setPrveRecordType } from "../MainPage/MainPageVideo";
import { Link } from "react-router-dom";
import { LogOut } from "../LoginPage/SignUp_SignIn/LogOut";
import { changeMode } from "../../darkWhiteMode/changeDarkOrWhiteMode";

interface sliderPropsType {
  clickListNumber: number;
  setClickListNumber: React.Dispatch<React.SetStateAction<number>>;
  setSearch: React.Dispatch<React.SetStateAction<retrunDataType[]>>;
  setSortState: React.Dispatch<React.SetStateAction<boolean>>;
}

type clickEvnet = (
  event: React.MouseEvent<HTMLLIElement, MouseEvent>,
  props: sliderPropsType,
  setRecord: Dispatch<React.SetStateAction<setPrveRecordType[]>>,
  setInterestedGame: Dispatch<React.SetStateAction<addGameDataType[]>>
) => void;

type secondClickEvnet = (
  setClickNumber: React.Dispatch<React.SetStateAction<number>>,
  dispatch: Dispatch<AnyAction>,
  index: number,
  event: React.MouseEvent<HTMLLIElement, MouseEvent>,
  select: initType,
  setSearch: React.Dispatch<React.SetStateAction<retrunDataType[]>>,
  setSortState: React.Dispatch<React.SetStateAction<boolean>>
) => void;

export type addGameDataType = {
  gameId: number;
  imgSrc: string;
  title: string;
};

const data = [
  [<MdSort />, "정렬"],
  [<BiVideoRecording />, "시청 기록"],
  [<LiaGamepadSolid />, "관심있는 게임"],
  [<BsSun />, "화이트 모드"],
  [<CiLogout />, "로그아웃"],
];

const secondLiData = [
  "최신순",
  "평점순",
  "pc지원 게임",
  "ps지원 게임",
  "Xbox 지원 게임",
];

const prevWatchClickEvent = (
  setRecord: Dispatch<React.SetStateAction<setPrveRecordType[]>>
) => {
  let sessionParseData: setPrveRecordType[] = [];
  const getData = sessionStorage.getItem("prevData");
  if (getData !== null) {
    sessionParseData = JSON.parse(getData);
    setRecord(sessionParseData);
  }
};

const clickEvent: clickEvnet = (event, props, setRecord, setInterestedGame) => {
  const target = event.target as HTMLLIElement;
  if (target.classList.contains("slidListItemActive")) {
    target.classList.remove("slidListItemActive");
  } else {
    const slideItems = document.querySelectorAll(".slideItem");
    slideItems.forEach((item) => {
      item.classList.remove("slidListItemActive");
    });
    target.classList.add("slidListItemActive");
  }
  const dataset = Number(target.dataset.num);
  props.setClickListNumber(dataset);
  switch (dataset) {
    case 1:
      prevWatchClickEvent(setRecord);
      break;
    case 2:
      thirdClickEvent(setInterestedGame);
      break;
    case 3:
      changeMode(target);
      break;
    case 4:
      LogOut();
      props.setClickListNumber(-1);
      break;
  }
};

const secondLiClickEvnet: secondClickEvnet = async (
  setClickNumber,
  dispatch,
  index,
  event,
  select,
  setSearch,
  setSortState
) => {
  setClickNumber(index);
  const target = event.target as HTMLLinkElement;
  const dataset = target.dataset.index;
  const unixTime = select.Nowunix;
  const limit = select.limit;
  let getData: getDataType = { returnData: [], page: 0 };
  setSortState(true);
  switch (Number(dataset)) {
    case 0:
      //첫 호출시에만 사용됨으로 page0d으로 고정
      getData = await getNextData(unixTime, 0, limit, "default");
      dispatch(changeType("default"));
      setSearch(getData.returnData);
      break;
    case 1:
      getData = await getNextData(unixTime, 0, limit, "sortRating");
      dispatch(changeType("sortRating"));
      setSearch(getData.returnData);
      break;
    case 2:
      getData = await getNextData(unixTime, 0, limit, "sortContainPc");
      dispatch(changeType("sortContainPc"));
      setSearch(getData.returnData);
      break;
    case 3:
      getData = await getNextData(unixTime, 0, limit, "sortContainPs");
      dispatch(changeType("sortContainPs"));
      setSearch(getData.returnData);
      break;
    case 4:
      getData = await getNextData(unixTime, 0, limit, "sortContainXbox");
      dispatch(changeType("sortContainXbox"));
      setSearch(getData.returnData);
      break;
  }
  window.scrollTo(0, 0);
  dispatch(cachData(getData.returnData));
  dispatch(pageUp(getData.page));
  setSortState(false);
};

const thirdClickEvent = (
  setData: Dispatch<React.SetStateAction<addGameDataType[]>>
) => {
  const getData = localStorage.getItem("addGameData");
  if (getData !== null) {
    const parse = JSON.parse(getData);
    setData(parse);
  }
};

export default function LogOutSliderLi(props: sliderPropsType) {
  const [secondLiClick, setClickNumber] = useState<number>(0);
  const [prevRecord, setRecord] = useState<setPrveRecordType[]>([]);
  const [InterestedGame, setInterestedGame] = useState<addGameDataType[]>([]);
  const select = useSelector((res: RootState) => res.counter1);
  const dispatch = useDispatch();

  return (
    <SlideUl>
      {data.map((item, index) => {
        return (
          <SlideItems
            data-num={index}
            key={index}
            onClick={(event) => {
              clickEvent(event, props, setRecord, setInterestedGame);
            }}
            className={`slideItem ${index === 3 ? "dark" : ""}`}
          >
            <SlideItemSvg>{item[0]}</SlideItemSvg>
            <SlideItemSpan>{item[1]}</SlideItemSpan>
          </SlideItems>
        );
      })}
      <SortSliderUl
        className={`${props.clickListNumber === 0 ? "firstUlActive" : null}`}
      >
        {secondLiData.map((item, index) => (
          <SortSliderLi
            key={index}
            data-index={index}
            onClick={(event) => {
              secondLiClickEvnet(
                setClickNumber,
                dispatch,
                index,
                event,
                select,
                props.setSearch,
                props.setSortState
              );
            }}
            className={`${secondLiClick === index ? "active" : null}`}
          >
            <SecondSlideItemSpan>{item}</SecondSlideItemSpan>
          </SortSliderLi>
        ))}
      </SortSliderUl>
      <PrevWatchUl
        className={`${
          props.clickListNumber === 1 ? "secondListItemActive" : null
        }`}
      >
        {prevRecord.map((item, index) => {
          return (
            <PrevWatchLi key={index}>
              <PrevWatchAnchor to={`/detail/${String(item.gameId)}`}>
                <PrevWatchItem>
                  <PrevWathchFigure>
                    <PrevWathchImg src={item.coverImg} alt="게임커버이미지" />
                  </PrevWathchFigure>
                  <PrevWathchTitle>{item.gameTitle}</PrevWathchTitle>
                </PrevWatchItem>
              </PrevWatchAnchor>
            </PrevWatchLi>
          );
        })}
      </PrevWatchUl>
      <InterestedGameUl
        className={`${
          props.clickListNumber === 2 ? "thirdListItemActive" : null
        }`}
      >
        {InterestedGame.map((item, index) => {
          return (
            <PrevWatchLi key={index}>
              <PrevWatchAnchor to={`/detail/${String(item.gameId)}`}>
                <PrevWatchItem>
                  <PrevWathchFigure>
                    <PrevWathchImg src={item.imgSrc} alt="게임커버이미지" />
                  </PrevWathchFigure>
                  <PrevWathchTitle>{item.title}</PrevWathchTitle>
                </PrevWatchItem>
              </PrevWatchAnchor>
            </PrevWatchLi>
          );
        })}
      </InterestedGameUl>
    </SlideUl>
  );
}

const SlideItems = styled.li`
  width: calc(100% - 70px);
  display: flex;
  position: relative;
  padding: 25px 0;
  padding-left: 20px;
  margin-left: 50px;
  margin-top: 14px;
  cursor: pointer;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  background-color: transparent;
  color: var(--fontBlack);

  &.slidListItemActive {
    background-color: var(--colorBlack);
    color: var(--fontWhite);
  }

  &.slidListItemDeActive {
    background-color: transparent;
    color: var(--fontWhite);
  }

  &.filterListActive ~ .secondUl {
    transform: translateX(100%);
    opacity: 1;
  }

  @media (max-width: 1200px) {
    margin-left: 30px;
  }

  @media (max-width: 740px) {
    margin-left: 15px;
  }
`;

const SlideItemSvg = styled.div`
  pointer-events: none;
`;

const SlideItemSpan = styled.span`
  margin-left: 30px;
  pointer-events: none;
`;

const SecondSlideItemSpan = styled.span`
  pointer-events: none;
`;

const SlideUl = styled.ul`
  width: 100%;
`;

const SortSliderUl = styled.ul`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--colorWhite);
  z-index: -1;
  transform: translateX(-100%);
  transition: all 0.5s;
  opacity: 0;

  &.firstUlActive .active {
    background-color: var(--colorGray);
  }
`;

const SortSliderLi = styled.li`
  width: calc(100% - 70px);
  display: flex;
  position: relative;
  padding: 25px 0;
  padding-left: 20px;
  margin-left: 50px;
  margin-top: 14px;
  cursor: pointer;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  background-color: transparent;
  color: var(--fontBlack);

  @media (max-width: 1200px) {
    margin-left: 30px;
  }

  @media (max-width: 740px) {
    margin-left: 15px;
  }
`;
const PrevWatchUl = styled.ul`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--colorWhite);
  z-index: -1;
  transform: translateX(-100%);
  transition: all 0.5s;
  opacity: 0;
  font-size: 15px;
  overflow-y: auto;
`;

const PrevWatchLi = styled.li`
  width: auto;
  display: flex;
  position: relative;
  padding: 25px 0;
  padding-left: 20px;
  margin-top: 14px;
  cursor: pointer;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  background-color: transparent;
  color: var(--fontBlack);
`;

const PrevWatchAnchor = styled(Link)`
  width: 100%;
  height: 100%;
  display: block;
`;

const PrevWatchItem = styled.div`
  position: relative;
  z-index: -1;
  width: 100%;
  height: 150px;
  display: flex;
`;

const PrevWathchFigure = styled.figure`
  width: 40%;
  height: 100%;
`;

const PrevWathchTitle = styled.span`
  width: 60%;
  display: block;
  margin-top: 15px;
  margin-left: 20px;
`;

const PrevWathchImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

const InterestedGameUl = styled.ul`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--colorWhite);
  z-index: -1;
  transform: translateX(-100%);
  transition: all 0.5s;
  opacity: 0;
  font-size: 15px;
  overflow-y: auto;
`;
