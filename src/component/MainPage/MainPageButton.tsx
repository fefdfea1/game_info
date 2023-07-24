import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import { addGameDataType } from "../sideSlider/SliderLi";

type propsTpye = {
  gameID: number;
};

const setLocalStorage = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  const target = event.target as HTMLButtonElement;
  const gameId = Number(target.dataset.gameid);
  const ExistActiveClass = target.classList.contains("Active");
  const title = target.parentElement?.childNodes[2]
    .childNodes[0] as HTMLParagraphElement;
  const innerText = title.innerText;
  const imgBox = target.parentElement?.childNodes[0]
    .childNodes[0] as HTMLElement;
  const imgTag = imgBox.childNodes[0] as HTMLImageElement;
  const imgSrc = imgTag.src;
  const setData = {
    imgSrc,
    title: innerText,
    gameId,
  };
  const getData = localStorage.getItem("addGameData");

  if (!ExistActiveClass) {
    if (getData !== null) {
      const parseData = JSON.parse(getData);
      const removeRedundancy = [...parseData, { ...setData }].filter(
        (object, index, arr) => {
          return (
            arr.findIndex((item) => item.gameId === object.gameId) === index
          );
        }
      );
      target.classList.add("Active");

      localStorage.setItem("addGameData", JSON.stringify(removeRedundancy));
    } else {
      localStorage.setItem("addGameData", JSON.stringify([setData]));
    }
  } else {
    if (getData !== null) {
      const parseData: addGameDataType[] = JSON.parse(getData);
      const removeData = parseData.filter((item) => item.gameId !== gameId);
      target.classList.remove("Active");
      localStorage.setItem("addGameData", JSON.stringify(removeData));
    }
  }
};

export default function MainPage(props: propsTpye) {
  const PText = useRef<HTMLParagraphElement>(null);
  const buttonDom = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonDom.current !== null) {
      const ButtonGameID = Number(buttonDom.current.dataset.gameid);
      const getStorageGameId = localStorage.getItem("addGameData");
      if (getStorageGameId !== null) {
        const parseData = JSON.parse(getStorageGameId);
        parseData.forEach((data: addGameDataType) => {
          if (
            data.gameId === ButtonGameID &&
            buttonDom.current !== null &&
            PText.current !== null
          ) {
            buttonDom.current.classList.add("Active");
            PText.current.innerText = "추가완료";
            return;
          }
        });
      }
    }
  }, []);

  return (
    <AddinterestGame
      onClick={(event) => {
        setLocalStorage(event);
      }}
      ref={buttonDom}
      data-gameid={props.gameID}
      className="activeButton"
    >
      <TextPTag ref={PText}>추가하기</TextPTag>
    </AddinterestGame>
  );
}

const AddinterestGame = styled.button`
  padding: 10px;
  border-radius: 30px;
  margin-top: 20px;
  margin-left: 27px;
  cursor: pointer;

  &.Active {
    background-color: black;
    color: #fff;
  }
`;

const TextPTag = styled.p`
  pointer-events: none;
`;
