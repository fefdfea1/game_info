import { sendPasswordResetEmail } from "firebase/auth";
import { appAuth } from "../common/fireBaseSettion";

type propsType = (event: React.FormEvent<HTMLFormElement>) => void;

export const ChangePassWord: propsType = (event) => {
  event.preventDefault();
  const target = event.target as HTMLFormElement;
  const input = target.childNodes[1] as HTMLInputElement;
  const userInput = input.value;
  const emailRegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (userInput !== "" && emailRegExp.test(userInput)) {
    sendPasswordResetEmail(appAuth, userInput)
      .then(() => {
        console.log("발송");
      })
      .catch(() => {});
  } else {
    alert("이메일 입력란이 공백 혹은 이메일 형식에 알맞지 않습니다");
  }
};
