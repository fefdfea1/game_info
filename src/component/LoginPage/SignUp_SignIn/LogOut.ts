import { NavigateFunction } from "react-router-dom";
import { appAuth } from "../../../common/fireBaseSetting";
import { signOut } from "firebase/auth";

export const LogOut = (navigate: NavigateFunction) => {
  signOut(appAuth)
    .then(() => {
      alert("로그아웃 되었습니다");
      navigate("/");
    })
    .catch((err) => {
      const errorMessage = err.message;
      alert(errorMessage);
    });
};
