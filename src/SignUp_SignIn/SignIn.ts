import { NavigateFunction } from "react-router-dom";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
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
      console.log(errorMessage);
    });
};
