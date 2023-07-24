import styled from "@emotion/styled";
import { useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { SignUp, OauthSignUp } from "../../SignUp_SignIn/SignUp";
import { AiOutlineGoogle } from "react-icons/ai";
import { SignIn } from "../../SignUp_SignIn/SignIn";

const SignUpsubMitEventHandler = (
  event: React.FormEvent<HTMLFormElement>,
  navigate: NavigateFunction
) => {
  event.preventDefault();
  const target = event.target as HTMLFormElement;
  const emailInput = target.childNodes[0] as HTMLInputElement;
  const passwordsInput = target.childNodes[1] as HTMLInputElement;
  const confirmPasswordInput = target.childNodes[2] as HTMLInputElement;
  const displayNameInput = target.childNodes[3] as HTMLInputElement;
  const email = emailInput.value;
  const password = passwordsInput.value;
  const confirmPassword = confirmPasswordInput.value;
  /*
    아이디 : 이메일 검사
    패스워드 8 ~ 16자 영문, 숫자, 특수문자를 최소 한가지씩 조합
    중복검사는 파이어베이스가 자체적으로 해주는 기능을 이용
  */
  const emailRegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const passwordsRegExp =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  const displayName = displayNameInput.value;
  if (confirmPassword === password) {
    if (emailRegExp.test(email)) {
      if (passwordsRegExp.test(password)) {
        SignUp(email, password, displayName, navigate);
      } else {
        alert(
          "비밀번호는 8 ~ 16자 영문, 숫자, 특수문자를 최소 한가지씩 조합해야합니다."
        );
      }
    } else {
      alert("올바른 이메일을 입력해 주십시오");
    }
  } else {
    alert("비밀번호를 다시 확인해주십시오");
  }
};

const LoginSubMitHandler = (
  event: React.FormEvent<HTMLFormElement>,
  navigate: NavigateFunction
) => {
  event.preventDefault();
  const target = event.target as HTMLElement;
  const emailInput = target.childNodes[0] as HTMLInputElement;
  const passwordsInput = target.childNodes[1] as HTMLInputElement;
  const email = emailInput.value;
  const passwords = passwordsInput.value;
  const emailRegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const passwordsRegExp =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  if (emailRegExp.test(email)) {
    if (passwordsRegExp.test(passwords)) {
      SignIn(email, passwords, navigate);
    }
  } else {
    alert("정확한 이메일을 입력해 주십시오");
  }
};

export default function LoginPage() {
  const [buttonClick, setClick] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <LoginPageContainer className={`${buttonClick ? "signUp" : "signIn"}`}>
      <BackToMainPage
        to={"/"}
        className={`${buttonClick ? "signUpActive" : "signInActive"}`}
      >
        <ArrowSvg />
      </BackToMainPage>
      <LoginArea className={`${buttonClick ? "signUpActive" : "signInActive"}`}>
        <MoveBox className="moveBox">
          <LoginSection>
            <LoginPositionBox>
              <LoginTitle>Sign In</LoginTitle>
              <form
                action="#"
                method="post"
                onSubmit={(event) => {
                  LoginSubMitHandler(event, navigate);
                }}
              >
                <UserInput placeholder="이메일 입력" type="email" />
                <UserInput placeholder="패스워드 입력" type="password" />
                <LoginButton>로그인</LoginButton>
                <ForgotPassword to={`/LoginPage`}>비밀번호 찾기</ForgotPassword>
              </form>
            </LoginPositionBox>
          </LoginSection>

          <SignUpSection>
            <SignUpPositionBox>
              <SignUpTitle>Sign Up</SignUpTitle>
              <form
                action="#"
                method="post"
                onSubmit={(event) => {
                  SignUpsubMitEventHandler(event, navigate);
                }}
              >
                <UserInput placeholder="이메일 입력" type="email" />
                <UserInput placeholder="패스워드 입력" type="password" />
                <UserInput placeholder="패스워드 확인" type="password" />
                <UserInput placeholder="사용할 이름입력" type="input" />
                <GoogleLogin
                  type="button"
                  onClick={(event) => {
                    OauthSignUp(event, "1004ff", navigate);
                  }}
                >
                  <GoogleIconPosition />
                  google 로그인
                </GoogleLogin>
                <LoginButton>회원가입</LoginButton>
              </form>
            </SignUpPositionBox>
          </SignUpSection>
        </MoveBox>
      </LoginArea>
      <SignUpArea
        className={`${buttonClick ? "signUpActive" : "signInActive"}`}
      >
        <SignUpAreaTitle>계정이 없으신가요?</SignUpAreaTitle>
        <SignUpButton
          className={`${buttonClick && "active"}`}
          onClick={() => {
            setClick(true);
          }}
        >
          Sign Up
        </SignUpButton>
        <SiInUpAreaTitle>이미 계정이 있으신가요?</SiInUpAreaTitle>
        <SignInButton
          className={`${!buttonClick && "active"}`}
          onClick={() => {
            setClick(false);
          }}
        >
          Sign in
        </SignInButton>
      </SignUpArea>
    </LoginPageContainer>
  );
}

const LoginPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #07a7f5;
  transition: background-color 0.5s;

  &.signUp {
    background-color: #b75379;
  }
`;

const LoginArea = styled.div`
  width: 500px;
  height: 700px;
  position: absolute;
  top: 50%;
  left: 35%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 1;
  overflow: hidden;
  transition: all 0.5s;
  &.signUpActive {
    transform: translate(50%, -50%);
  }

  &.signInActive .moveBox {
    transform: translateY(0);
  }

  &.signUpActive .moveBox {
    transform: translateY(-100%);
  }
`;

const SignUpArea = styled.div`
  width: 1250px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #0792d7;
  transition: background-color 0.5s;

  &.signUpActive {
    background-color: #a04969;
  }
`;

const LoginPositionBox = styled.div`
  width: auto;
  position: absolute;
  top: 25%;
  left: 10%;
`;

const LoginSection = styled.div`
  width: 100%;
  height: 100%;
`;

const LoginTitle = styled.p`
  font-size: 40px;
  color: #333;
  margin-bottom: 32px;
  font-weight: 600;
`;

const UserInput = styled.input`
  width: 380px;
  display: block;
  border: 1px solid black;
  margin-bottom: 23px;
  padding: 20px 10px;
  border-radius: 10px;
`;

const LoginButton = styled.button`
  padding: 20px 45px;
  background-color: #04a4f0;
  color: #fff;
  margin-top: 8px;
  display: block;
  margin-bottom: 30px;
  cursor: pointer;
  border-radius: 10px;

  &:active {
    background-color: #04a4f9;
  }
`;

const ForgotPassword = styled(Link)`
  text-decoration: underline;
  font-size: 20px;
  font-weight: 600;
  color: black;
`;

const SignUpAreaTitle = styled.p`
  position: absolute;
  top: 38%;
  right: 20%;
  font-size: 25px;
  color: #fff;
`;

const SignUpButton = styled.button`
  position: absolute;
  top: 50%;
  right: 24%;
  padding: 18px 30px;
  background-color: #fff;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
`;

const SiInUpAreaTitle = styled(SignUpAreaTitle)`
  left: 20%;
  top: 38%;
  right: auto;
`;

const SignInButton = styled(SignUpButton)`
  top: 50%;
  left: 24%;
  right: auto;
`;

const MoveBox = styled.div`
  width: 100%;
  height: 100%;
  transform: translateY(0);
  transition: all 0.5s;
`;

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
  background-color: #0792d7;
  cursor: pointer;
  transition: background-color 0.5s;
  color: black;
  &.signUpActive {
    background-color: #a04969;
  }

  &:active {
    color: #999;
  }
`;

const ArrowSvg = styled(AiOutlineArrowLeft)`
  width: 40px;
  height: 40px;
`;

const SignUpSection = styled(LoginSection)`
  transform: translateY(0);
`;

const SignUpPositionBox = styled(LoginPositionBox)`
  top: 15%;
`;

const GoogleLogin = styled.button`
  width: 100%;
  position: relative;
  display: block;
  padding: 18px 30px;
  box-sizing: border-box;
  font-size: 19px;
  cursor: pointer;
  border-radius: 10px;

  &:active {
    background-color: #999;
    color: #fff;
  }
`;

const GoogleIconPosition = styled(AiOutlineGoogle)`
  position: absolute;
  top: 55%;
  left: 28%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  color: #999;
`;

const SignUpTitle = styled(LoginTitle)``;
