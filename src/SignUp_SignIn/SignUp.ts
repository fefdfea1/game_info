import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { appAuth } from "../common/fireBaseSettion";
import { NavigateFunction } from "react-router-dom";
import { appFireStore, Provider } from "../common/fireBaseSettion";
import { doc, setDoc } from "firebase/firestore";
const noProfileImg =
  "https://firebasestorage.googleapis.com/v0/b/for-gamer-f55df.appspot.com/o/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.png?alt=media&token=9cb4a6ac-3b05-4471-a2ae-acb499612e09";
export const SignUp = async (
  email: string,
  password: string,
  displayName: string,
  navigate: NavigateFunction
) => {
  createUserWithEmailAndPassword(appAuth, email, password)
    .then(async (userCredential) => {
      const { user } = userCredential;
      await setDoc(doc(appFireStore, "userInfo", email), {
        userEmail: email,
        userName: displayName,
        userProfileImg: noProfileImg,
      });

      navigate("/");
      if (!user) throw new Error("회원가입에 실패 했습니다");
    })
    .catch((err) => {
      if (
        (err = "FirebaseError: Firebase: Error (auth/email-already-in-use).")
      ) {
        alert("이미 사용중인 아이디입니다");
      }
    });
};

export const OauthSignUp = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  password: string,
  navigate: NavigateFunction
) => {
  signInWithPopup(appAuth, Provider).then(async (result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential !== null) {
      const token = credential.accessToken;
      const googleUserInfo = result.user;
      if (googleUserInfo.email !== null) {
        createUserWithEmailAndPassword(appAuth, googleUserInfo.email, password)
          .then(async (userCredential) => {
            const { user } = userCredential;
            if (googleUserInfo.email !== null) {
              await setDoc(
                doc(appFireStore, "userInfo", googleUserInfo.email),
                {
                  userEmail: googleUserInfo.email,
                  userName: googleUserInfo.displayName,
                  userProfileImg: noProfileImg,
                }
              );
            }

            navigate("/");
            if (!user) throw new Error("회원가입에 실패 했습니다");
          })
          .catch((err) => {
            const errorCode = err.code;
            if (errorCode === "auth/email-already-in-use") {
              alert("이미 가입된 이메일입니다");
            }
          });
      }
    }
  });
};
