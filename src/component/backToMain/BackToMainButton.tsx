import styled from "@emotion/styled";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
type propsType = {
  buttonClick?: boolean;
  backgroundColor: string;
  color: string;
};

export default function BackToMainButton(props: propsType) {
  return (
    <BackToMainPage
      to={"/"}
      className={`${props.buttonClick ? "signUpActive" : "signInActive"}`}
    >
      <ArrowSvg />
    </BackToMainPage>
  );
}

const BackToMainPage = styled(Link)`
  width: 60px;
  height: 60px;
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: var(--colorGray);
  cursor: pointer;
  transition: background-color 0.5s;
  color: var(--colorBlack);
  z-index: 9999;
  &.signUpActive {
    background-color: var(--colorBlack);
    color: var(--colorWhite);
  }

  &:active {
    opacity: 0.8;
  }
`;

const ArrowSvg = styled(AiOutlineArrowLeft)`
  width: 40px;
  height: 40px;
`;
