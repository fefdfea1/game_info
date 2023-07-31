import styled from "@emotion/styled";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { appAuth, appFireStore, storage } from "../../common/fireBaseSettion";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import BackToMainButton from "../backToMain/BackToMainButton";

const changeProfile = (
  event: React.ChangeEvent<HTMLInputElement>,
  PreviewImg: React.RefObject<HTMLImageElement>
) => {
  const target = event.target as HTMLInputElement;
  const targetValue = target.value;
  if (target.files) {
    const filePath = target.files[0];
    const reg = /(.*?)\.(jpg|jpeg|png|webp)$/;

    if (targetValue !== "" && reg.test(targetValue)) {
      if (PreviewImg.current) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(filePath);
        fileReader.onload = (e) => {
          const result = e?.target?.result as string;
          if (PreviewImg.current) {
            PreviewImg.current.src = result;
          }
        };
      }
    } else {
      alert("올바른 이미지 확장자(jpg,jpeg,png,webp)를 확인해주십시오");
    }
  }
};

const subMithandler = async (
  event: React.FormEvent<HTMLFormElement>,
  PreviewEmail: React.RefObject<HTMLParagraphElement>,
  PreviewName: React.RefObject<HTMLParagraphElement>,
  PreviewProfile: React.RefObject<HTMLImageElement>,
  PreviewImgInput: React.RefObject<HTMLInputElement>
) => {
  event.preventDefault();
  if (appAuth.currentUser) {
    const reg = /[()]/g;
    const emailRegExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    var nameRegExp = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z].{2,16}$/; // 닉네임 한글 or 영어만

    const email = appAuth.currentUser.email;
    const changeEmail = PreviewEmail.current?.innerText.replace(reg, "");
    const changeName = PreviewName.current?.innerText;
    if (!changeName) {
      alert("변경할 이름을 입력해 주십시오");
      return;
    }
    if (
      PreviewEmail.current &&
      PreviewName.current &&
      email &&
      PreviewImgInput.current &&
      changeEmail
    ) {
      if (changeName !== "") {
        if (emailRegExp.test(changeEmail) && nameRegExp.test(changeName)) {
          if (PreviewImgInput.current.files) {
            const imageRef = ref(storage, `${appAuth.currentUser?.uid}`);
            const upLoadImage = PreviewImgInput.current.files[0];
            const currentUserUid = appAuth.currentUser.uid;
            if (upLoadImage) {
              if (!imageRef) return;
              uploadBytes(imageRef, upLoadImage).then((snapShot) => {
                getDownloadURL(snapShot.ref)
                  .then(async (url) => {
                    const userDoc = doc(
                      appFireStore,
                      "userInfo",
                      currentUserUid
                    );
                    await updateDoc(userDoc, {
                      userEmail: changeEmail,
                      userName: changeName,
                      userProfileImg: url,
                    });
                    alert("변경이 완료되었습니다");
                  })
                  .catch((err) => {
                    const ErrorMessage = err.message;
                    alert(ErrorMessage);
                  });
              });
            } else {
              const userDoc = doc(appFireStore, "userInfo", currentUserUid);
              await updateDoc(userDoc, {
                userEmail: changeEmail,
                userName: changeName,
              });
              alert("변경이 완료되었습니다");
            }
          }
        } else {
          alert(
            "이메일 형식 혹은 이름이 3 ~ 15자리의 영문 혹은 한글로 구성되어 있는지 확인해주십시오"
          );
        }
      } else {
        alert("닉네임 확인");
      }
    }
  }
};

export default function UserSetting() {
  const profileImgRef = useRef<HTMLImageElement>(null);
  const UserNameRef = useRef<HTMLParagraphElement>(null);
  const UserEmailRef = useRef<HTMLInputElement>(null);
  const PreviewImg = useRef<HTMLImageElement>(null);
  const PreviewName = useRef<HTMLParagraphElement>(null);
  const PreviewEmail = useRef<HTMLParagraphElement>(null);
  const PreviewImgInput = useRef<HTMLInputElement>(null);
  const [emailValue, setEmailValue] = useState<string>("");
  const [changeName, setName] = useState<string>("");
  useEffect(() => {
    onAuthStateChanged(appAuth, async (user) => {
      if (user) {
        const userEmail = user.email;
        const userUid = user.uid;
        if (userEmail) {
          const docRef = doc(appFireStore, "userInfo", userUid);
          const docSnap = await getDoc(docRef);
          const getUserInfo = docSnap.data();
          if (
            profileImgRef.current &&
            UserEmailRef.current &&
            UserNameRef.current &&
            getUserInfo &&
            PreviewImg.current &&
            PreviewEmail.current &&
            PreviewName.current
          ) {
            profileImgRef.current.src = getUserInfo.userProfileImg;
            UserEmailRef.current.value = userEmail;
            UserNameRef.current.innerText = getUserInfo.userName;
            PreviewImg.current.src = getUserInfo.userProfileImg;
            PreviewEmail.current.innerText = `(${userEmail})`;
            PreviewName.current.innerText = getUserInfo.userName;
          }
        }
      }
    });
  }, []);
  return (
    <Background>
      <BackToMainButton backgroundColor="#999" color="#fff" />
      <SettingProfileBox>
        <ProfileImgBox>
          <UserProfileImg ref={profileImgRef} />
        </ProfileImgBox>
        <UserName ref={UserNameRef}></UserName>
        <UserInfoBox
          action="#"
          method="post"
          onSubmit={(event) => {
            subMithandler(
              event,
              PreviewEmail,
              PreviewName,
              PreviewImg,
              PreviewImgInput
            );
          }}
        >
          <EditUserInfo
            ref={UserEmailRef}
            type="email"
            placeholder="변경할 이메일 입력"
            onChange={(event) => {
              setEmailValue(event.target.value);
            }}
          />
          <EditUserInfo
            type="text"
            placeholder="변경할 이름 입력"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <Description>변경된 프로필 미리보기</Description>
          <ShowPreviewProfileBox>
            <PreviewUserPage>
              <ShowPreviewImgBox>
                <ShowPrevireImg ref={PreviewImg} />
              </ShowPreviewImgBox>
              <ShowPreveUserInfo>
                <ShowPreviewName ref={PreviewName}>
                  {changeName}
                </ShowPreviewName>
                <ShowPreviewEmail ref={PreviewEmail}>
                  {emailValue}
                </ShowPreviewEmail>
                <div>
                  <ShowPrevViewSpan>개인설정</ShowPrevViewSpan>
                  <ShowPrevViewSpan>로그아웃</ShowPrevViewSpan>
                </div>
              </ShowPreveUserInfo>
            </PreviewUserPage>
            <div>
              <EditUserProfile
                type="file"
                id="profileImgId"
                accept="image/png, image/jpeg, image/webp, image/jpg"
                ref={PreviewImgInput}
                onChange={(event) => {
                  changeProfile(event, PreviewImg);
                }}
              />
              <EditUserInfoLabel htmlFor="profileImgId">
                프로필 이미지 수정
              </EditUserInfoLabel>
            </div>
          </ShowPreviewProfileBox>
          <SubmitButtonPositionBox>
            <SubmitButton>수정하기</SubmitButton>
          </SubmitButtonPositionBox>
        </UserInfoBox>
      </SettingProfileBox>
    </Background>
  );
}

const Background = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--backgroundColor);
`;

const SettingProfileBox = styled.div`
  width: 45%;
  min-width: 540px;
  max-width: 800px;
  min-height: 700px;
  padding: 64px;
  position: relative;
  box-shadow: 0 0 10px #fff;
  box-sizing: border-box;
`;

const ProfileImgBox = styled.figure`
  width: 200px;
  height: 200px;
  position: absolute;
  top: 1%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--colorWhite);
`;

const UserProfileImg = styled.img`
  width: 100%;
  height: 100%;
`;

const UserName = styled.p`
  text-align: center;
  color: var(--fontWhite);
  margin-top: 63px;
  font-size: 30px;
`;

const Description = styled.p`
  font-size: 20px;
  text-align: center;
  margin-top: 30px;
`;

const UserInfoBox = styled.form`
  width: 100%;
  margin-top: 86px;
  color: var(--fontWhite);
`;

const ShowPreviewImgBox = styled.figure`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  overflow: hidden;
`;

const EditUserInfoLabel = styled.label`
  width: 50px;
  display: inline-block;
  padding: 15px 20px;
  border: 1px solid black;
  background: #fff;
  color: var(--fontBlack);
  margin-left: 60px;
  border-radius: 15px;
  cursor: pointer;
  text-align: center;

  &:active {
    opacity: 0.9;
  }
`;

const ShowPrevireImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ShowPreviewProfileBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
`;

const ShowPreviewName = styled.p`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 16px;
`;

const ShowPreviewEmail = styled.p`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 17px;
`;

const ShowPrevViewSpan = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-left: 6px;
  font-size: 13px;

  &:first-child {
    margin-left: 0;
  }
`;

const ShowPreveUserInfo = styled.div`
  width: 150px;
  margin-left: 25px;
  color: var(--fontBlack);
  line-height: 1.6;
`;

const PreviewUserPage = styled.div`
  padding: 30px; 20px;
  display:flex;
  justify-content: center;
  align-items: center;
  background-color: var(--colorGray);
  box-shadow: 0 0 10px #777;
  border-radius: 15px;
`;

const EditUserInfo = styled.input`
  width: 100%;
  font-size: 18px;
  background-color: var(--backgroundColor);
  color: var(--fontWhite);
  font-size: 25px;
  margin-top: 50px;
  padding: 15px 20px;
  transition: all 0.3s;
  box-sizing: border-box;

  &:focus,
  &:active {
    background-color: var(--colorWhite);
    color: var(--fontBlack);
  }

  &:first-child {
    margin-top: 0;
  }
`;

const EditUserProfile = styled.input`
  display: none;
`;

const SubmitButtonPositionBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
`;

const SubmitButton = styled.button`
  padding: 15px 20px;
  border-radius: 15px;
  cursor: pointer;
  &:active {
    opacity: 0.9;
  }
`;
