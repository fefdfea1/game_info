import { appAuth } from "../common/fireBaseSetting";
import { signOut } from "firebase/auth";

export const LogOut = () => {
  signOut(appAuth)
    .then(() => {
      alert("로그아웃 되었습니다");
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMessage = err.message;
      alert(errorMessage);
    });
};
