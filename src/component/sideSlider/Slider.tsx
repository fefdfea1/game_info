import SliderLi from "./SliderLi";
import LogOutSliderLi from "./LogInSliderLi";
import styled from "@emotion/styled";
import { useState } from "react";
import { retrunDataType } from "../../dataFetch/getGameData";

type porpsType = {
  setSearch: React.Dispatch<React.SetStateAction<retrunDataType[]>>;
  setSortState: React.Dispatch<React.SetStateAction<boolean>>;
  LoginState: boolean;
};

export default function Slider(props: porpsType) {
  const [clickList, setClickList] = useState<number>(-1);
  const [buttonClick, setClickStatus] = useState(false);
  return (
    <>
      <SlideContainer
        className={`${buttonClick === true ? "slidActive" : null}`}
      >
        <SliderLogo>Logo</SliderLogo>
        {!props.LoginState ? (
          <SliderLi
            setClickListNumber={setClickList}
            clickListNumber={clickList}
            setSearch={props.setSearch}
            setSortState={props.setSortState}
          />
        ) : (
          <LogOutSliderLi
            setClickListNumber={setClickList}
            clickListNumber={clickList}
            setSearch={props.setSearch}
            setSortState={props.setSortState}
          />
        )}
        <SlideActiveButtonSvgBox
          type="button"
          onClick={() => {
            setClickStatus(!buttonClick);
          }}
        >
          <SlideActiveButtonSvg
            style={{ pointerEvents: "none" }}
            className={`${buttonClick === true ? "buttonActive" : null}`}
          />
        </SlideActiveButtonSvgBox>
      </SlideContainer>
    </>
  );
}

const SlideContainer = styled.aside`
  width: 300px;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: var(--colorWhite);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  position: fixed;
  left: 0;
  top: 0;
  font-size: 24px;
  transform: translateX(-100%);
  transition: all 0.5s;

  &.slidActive {
    transform: translateX(0);
  }

  &.slidActive ul {
    @media (max-width: 1200px) {
      width: 250px;
      font-size: 19px;
    }

    @media (max-width: 740px) {
      width: 200px;
      font-size: 15px;
    }
  }

  &.slidActive ul .slidListItemActive ~ .firstUlActive {
    transform: translateX(100%);
    opacity: 1;
  }

  &.slidActive ul .slidListItemActive ~ .secondListItemActive {
    transform: translateX(100%);
    opacity: 1;
  }

  &.slidActive ul .slidListItemActive ~ .thirdListItemActive {
    transform: translateX(100%);
    opacity: 1;
  }

  @media (max-width: 1200px) {
    width: 250px;
    font-size: 19px;
  }
  @media (max-width: 740px) {
    width: 200px;
    font-size: 15px;
  }
`;

const SliderLogo = styled.h2`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
`;

const SlideActiveButtonSvgBox = styled.button`
  width: 30px;
  height: 50px;
  background-color: var(--colorWhite);
  position: absolute;
  top: 50%;
  right: -30px;
  transform: translateY(-50%);
  border: 0;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  cursor: pointer;
`;

const SlideActiveButtonSvg = styled.div`
  width: 20px;
  height: 20px;
  transform: rotate(45deg);
  border: 0;
  border-top: 3px solid var(--colorBlack);
  border-right: 3px solid var(--colorBlack);
  background: transparent;
  margin-left: -4px;
  transition: transform 0.5s;

  &.buttonActive {
    transform: rotate(225deg) translateX(-7px) translateY(7px);
  }
`;
