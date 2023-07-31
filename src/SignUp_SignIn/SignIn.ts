import { NavigateFunction } from "react-router-dom";
import {
  GoogleAuthProvider,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { appAuth } from "../common/fireBaseSettion";

type propsType = (
  email: string,
  passwords: string,
  navigate: NavigateFunction
) => void;

export const SignIn: propsType = (email, passwords, navigate) => {
  setPersistence(appAuth, browserSessionPersistence)
    .then(() => {
      signInWithEmailAndPassword(appAuth, email, passwords)
        .then((userCredential) => {
          navigate("/");
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const OauthSignIn = (navigate: any) => {
  const provider = new GoogleAuthProvider(); // provider 구글 설정
  signInWithPopup(appAuth, provider) // 팝업창 띄워서 로그인
    .then((data) => {
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
