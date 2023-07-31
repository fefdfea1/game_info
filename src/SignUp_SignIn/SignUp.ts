import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { appAuth } from "../common/fireBaseSettion";
import { NavigateFunction } from "react-router-dom";
import { appFireStore, Provider } from "../common/fireBaseSettion";
import { doc, getDoc, setDoc } from "firebase/firestore";
const noProfileImg =
  "https://firebasestorage.googleapis.com/v0/b/for-gamer-f55df.appspot.com/o/noProfileImg%2F%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.png?alt=media&token=3c09cb03-28fb-4b5a-be4e-59dd53a63408";
export const SignUp = async (
  email: string,
  password: string,
  displayName: string,
  navigate: NavigateFunction
) => {
  createUserWithEmailAndPassword(appAuth, email, password)
    .then(async (userCredential) => {
      const { user } = userCredential;

      await setDoc(doc(appFireStore, "userInfo", user.uid), {
        userEmail: email,
        userName: displayName,
        userProfileImg: noProfileImg,
        userUid: user.uid,
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
  event: React.MouseEvent<HTMLButtonElement>,
  navigate: NavigateFunction
) => {
  event.preventDefault();
  signInWithPopup(appAuth, Provider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential !== null) {
        const googleUserInfo = result.user;
        const userEmail = googleUserInfo.email;
        const userUid = googleUserInfo.uid;
        const userName = googleUserInfo.displayName;
        if (userEmail !== null) {
          const data = await getDoc(doc(appFireStore, "userInfo", userUid));
          const parse = data.data();
          if (!parse) {
            await setDoc(doc(appFireStore, "userInfo", userUid), {
              userEmail: userEmail,
              userName: userName,
              userProfileImg: noProfileImg,
              userUid: userUid,
            });

            navigate("/");
            if (!googleUserInfo) throw new Error("회원가입에 실패 했습니다");
          } else {
            alert("이미 해당 이메일로 가입된 정보가 있습니다");
          }
        }
      }
    })
    .catch((err) => {
      const errorMessage = err.message;
      alert(errorMessage);
      return;
    });
};
