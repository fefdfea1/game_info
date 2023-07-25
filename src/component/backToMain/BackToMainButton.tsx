import styled from "@emotion/styled";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

type propsType = {
  buttonClick?: boolean;
  backgroundColor: string;
  color: string;
};

type EmotionType = {
  backgorundColor: string;
  color: string;
};

export default function BackToMainButton(props: propsType) {
  return (
    <BackToMainPage
      to={"/"}
      className={`${props.buttonClick ? "signUpActive" : "signInActive"}`}
      backgorundColor={props.backgroundColor}
      color={props.color}
    >
      <ArrowSvg />
    </BackToMainPage>
  );
}

// background-color: #0792d7;
// #0792d7

const BackToMainPage = styled(Link)<EmotionType>`
  width: 60px;
  height: 60px;
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: ${(props) => props.backgorundColor};
  cursor: pointer;
  transition: background-color 0.5s;
  color: ${(props) => props.color};
  &.signUpActive {
    background-color: #a04969;
  }

  &:active {
    opacity: 0.8;
  }
`;

const ArrowSvg = styled(AiOutlineArrowLeft)`
  width: 40px;
  height: 40px;
`;
