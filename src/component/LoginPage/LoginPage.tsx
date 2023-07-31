import styled from "@emotion/styled";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { SignUp, OauthSignUp } from "../../SignUp_SignIn/SignUp";
import { AiOutlineGoogle } from "react-icons/ai";
import { OauthSignIn, SignIn } from "../../SignUp_SignIn/SignIn";
import BackToMainButton from "../backToMain/BackToMainButton";
import { ChangePassWord } from "../../SignUp_SignIn/ChangePassword";

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
  const [changePassword, setPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <LoginPageContainer className={`${buttonClick ? "signUp" : "signIn"}`}>
      <BackToMainButton
        buttonClick={buttonClick}
        backgroundColor="#0792d7"
        color="black"
      />
      <LoginArea className={`${buttonClick ? "signUpActive" : "signInActive"}`}>
        <MoveBox className="moveBox">
          <LoginSection>
            <LoginPositionBox>
              <SignInSignUpTitle>Sign In</SignInSignUpTitle>
              <UserForm
                action="#"
                method="post"
                onSubmit={(event) => {
                  LoginSubMitHandler(event, navigate);
                }}
              >
                <UserInput placeholder="이메일 입력" type="email" />
                <UserInput placeholder="패스워드 입력" type="password" />
                <LoginButton>로그인</LoginButton>
                <GoogleLogin
                  type="button"
                  onClick={(event) => {
                    OauthSignIn(navigate);
                  }}
                >
                  <GoogleIconPosition />
                  google 로그인
                </GoogleLogin>
                <ForgotPassword
                  type="button"
                  onClick={() => {
                    setPassword(true);
                  }}
                >
                  비밀번호를 잊어버렸어요
                </ForgotPassword>
              </UserForm>
            </LoginPositionBox>
          </LoginSection>

          <SignUpSection>
            <SignUpPositionBox>
              <SignInSignUpTitle>Sign Up</SignInSignUpTitle>
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
                    navigate("/OauthSignUp");
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
        <SignInAreaTitle>이미 계정이 있으신가요?</SignInAreaTitle>
        <SignInButton
          className={`${!buttonClick && "active"}`}
          onClick={() => {
            setClick(false);
          }}
        >
          Sign in
        </SignInButton>
      </SignUpArea>
      {changePassword && (
        <ResetPassowrd>
          <ResetBox
            onSubmit={(event) => {
              ChangePassWord(event);
            }}
          >
            <h3>계정찾기</h3>
            <input type="email" placeholder="이메일 입력" />
            <button>찾기</button>
            <button
              type="button"
              onClick={() => {
                setPassword(false);
              }}
            >
              X
            </button>
          </ResetBox>
        </ResetPassowrd>
      )}
    </LoginPageContainer>
  );
}

const LoginPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: var(--backgroundColor);
  transition: background-color 0.5s;

  &.signUp {
    background-color: var(--darkGray);
  }
`;

const LoginArea = styled.div`
  width: 500px;
  height: 700px;
  position: absolute;
  top: 50%;
  left: 35%;
  transform: translate(-50%, -50%);
  background-color: var(--colorWhite);
  z-index: 1;
  overflow: hidden;
  transition: all 0.5s;
  &.signUpActive {
    left: 65%;
  }

  &.signInActive .moveBox {
    transform: translateY(0);
  }

  &.signUpActive .moveBox {
    transform: translateY(-100%);
  }

  @media (max-width: 1200px) {
    &.signInActive {
      left: 37%;
    }
  }
  @media (max-width: 1000px) {
    &.signInActive {
      left: 34%;
    }
    &.signUpActive {
      left: 66%;
    }
  }

  @media (max-width: 900px) {
    width: 400px;
    height: 660px;
  }

  @media (max-width: 740px) {
    &.signInActive {
      left: 32%;
    }
    &.signUpActive {
      left: 69%;
    }
  }
`;

const SignUpArea = styled.div`
  width: 1250px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--colorGray);
  transition: background-color 0.5s;

  &.signUpActive {
    background-color: var(--colorBlack);
  }

  @media (max-width: 1200px) {
    width: 900px;
  }

  @media (max-width: 900px) {
    width: 700px;
  }
`;

const LoginPositionBox = styled.div`
  width: 100%;
  position: absolute;
  top: 25%;
  padding: 0 30px;
  box-sizing: border-box;
`;

const LoginSection = styled.div`
  width: 100%;
  height: 100%;
`;

const SignInSignUpTitle = styled.h2`
  font-size: 40px;
  color: var(--SignInSignUpTitleFontColor);
  margin-bottom: 32px;
  font-weight: 600;
`;

const UserForm = styled.form`
  width: 100%;
  height: 100%;
`;

const UserInput = styled.input`
  width: 100%;
  display: block;
  border: 1px solid black;
  margin-bottom: 23px;
  padding: 20px 10px;
  border-radius: 10px;
  box-sizing: border-box;
`;

const LoginButton = styled.button`
  padding: 20px 45px;
  background-color: var(--loginButtonBackgroundColor);
  color: var(colorWhite);
  margin-top: 8px;
  display: block;
  margin-bottom: 30px;
  cursor: pointer;
  border-radius: 10px;

  &:active {
    background-color: var(--loginButtonActiveBackgroundColor);
  }
`;

const ForgotPassword = styled.button`
  text-decoration: underline;
  font-size: 20px;
  font-weight: 600;
  color: var(--colorBlack);
  background-color: transparent;
  margin-top: 30px;
  cursor: pointer;
`;

const SignUpAreaTitle = styled.p`
  position: absolute;
  top: 38%;
  right: 20%;
  font-size: 25px;
  color: var(--colorWhite);

  @media (max-width: 1200px) {
    right: 8%;
  }

  @media (max-width: 900px) {
    right: 3%;
    font-size: 20px;
  }
`;

const SignUpButton = styled.button`
  position: absolute;
  top: 50%;
  right: 24%;
  padding: 18px 30px;
  background-color: var(--colorWhite);
  color: var(--fontBlack);
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;

  @media (max-width: 1200px) {
    right: 13%;
  }

  @media (max-width: 900px) {
    top: 47%;
    right: 9%;
    padding: 10px 20px;
    font-size: 15px;
  }
`;

const SignInAreaTitle = styled(SignUpAreaTitle)`
  position: absolute;
  top: 38%;
  right: 20%;
  font-size: 25px;
  color: var(--colorWhite);

  @media (max-width: 1200px) {
    left: 8%;
  }

  @media (max-width: 900px) {
    left: 3%;
    font-size: 20px;
  }
`;

const SignInButton = styled.button`
  position: absolute;
  top: 50%;
  left: 24%;
  padding: 18px 30px;
  background-color: var(--colorWhite);
  color: var(--fontBlack);
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;

  @media (max-width: 1200px) {
    left: 15%;
  }

  @media(max-width:900px){
    top:47%;
    left:13%;
    padding: 10px; 20px;
    font-size: 15px;
  }
`;

const MoveBox = styled.div`
  width: 100%;
  height: 100%;
  transform: translateY(0);
  transition: all 0.5s;
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
    color: var(--colorWhite);
  }
`;

const GoogleIconPosition = styled(AiOutlineGoogle)`
  position: absolute;
  top: 55%;
  left: 28%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  color: vaR(--fontGray);
`;

const ResetPassowrd = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(80, 80, 80, 0.8);
  z-index: 999;
`;

const ResetBox = styled.form`
  width: 500px;
  height: 300px;
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  padding: 20px;

  & h3 {
    margin-top: 70px;
    font-size: 25px;
  }

  & input {
    height: 40px;
    padding: 10px 5px;
    border: 0;
    border-bottom: 1px solid #999;
    margin-top: 30px;
  }

  & button:nth-of-type(1) {
    height: 40px;
    margin-top: 30px;
    cursor: pointer;
  }

  & button:nth-of-type(2) {
    font-size: 20px;
    position: absolute;
    top: 30px;
    right: 30px;
    background: transparent;
    cursor: pointer;
  }
`;
