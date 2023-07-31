import styled from "@emotion/styled";
import { Common } from "../common/global";
import { OauthSignUp } from "./SignUp";
import { useNavigate } from "react-router-dom";

export default function OauthSigUp() {
  const navigate = useNavigate();
  return (
    <OAuthSignUpContainer>
      <SignUpContainer
        onSubmit={(event) => {
          OauthSignUp(event, navigate);
        }}
      >
        <h2>Sign Up</h2>
        <UserInput placeholder="비밀번호 입력" type="password"></UserInput>
        <UserInput placeholder="비밀번호 입력" type="password"></UserInput>
        <UserInput placeholder="사용할 닉네임 입력" type="text"></UserInput>
        <SubmmitButton>회원가입</SubmmitButton>
      </SignUpContainer>
    </OAuthSignUpContainer>
  );
}

const OAuthSignUpContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${Common.Backgroundcolor.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpContainer = styled.form`
  width: 500px;
  height: 600px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  border-radius: 15px;

  & h2 {
    font-size: 35px;
    font-weight: bold;
  }
`;

const UserInput = styled.input`
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  margin-top: 50px;
  border-radius: 15px;
  padding: 30px 10px;
  font-size: 20px;
  &:first-child {
    margin-top: 0;
  }
`;

const SubmmitButton = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 15px;
  margin-top: 30px;
  color: var(--fontBlack);
  cursor: pointer;
`;
