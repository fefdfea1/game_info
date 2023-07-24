import { NavigateFunction } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { appAuth } from "../common/fireBaseSettion";

type propsType = (
  email: string,
  passwords: string,
  navigate: NavigateFunction
) => void;

export const SignIn: propsType = (email, passwords, navigate) => {
  signInWithEmailAndPassword(appAuth, email, passwords)
    .then((userCredential) => {
      const user = userCredential;
      navigate("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
};
