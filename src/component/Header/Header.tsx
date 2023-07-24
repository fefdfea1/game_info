import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";
import { Common } from "../../common/variable";
import { appAuth, appFireStore } from "../../common/fireBaseSettion";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { LogOut } from "../../SignUp_SignIn/LogOut";

export default function Header() {
  const userProfile = useRef<HTMLImageElement>(null);
  const userName = useRef<HTMLSpanElement>(null);
  const profileClickProfile = useRef<HTMLImageElement>(null);
  const profileClickName = useRef<HTMLSpanElement>(null);
  const profileClickEmail = useRef<HTMLParagraphElement>(null);
  const [clickUserProfile, setClickProfileState] = useState<boolean>(false);
  useEffect(() => {
    onAuthStateChanged(appAuth, async (user) => {
      if (user) {
        const userEmail = user.email;
        if (typeof userEmail === "string") {
          const docRef = doc(appFireStore, "userInfo", userEmail);
          const docSnap = await getDoc(docRef);
          const getUserInfo = docSnap.data();
          if (userProfile.current && getUserInfo && userName.current) {
            userProfile.current.src = getUserInfo.userProfileImg;
            userName.current.innerText = getUserInfo.userName;
          }
          if (
            profileClickProfile.current &&
            profileClickName.current &&
            profileClickEmail.current &&
            getUserInfo
          ) {
            profileClickProfile.current.src = getUserInfo.userProfileImg;
            profileClickName.current.innerText = getUserInfo.userName;
            profileClickEmail.current.innerText = `(${getUserInfo.userEmail})`;
          }
        }
      } else {
        console.log("로그아웃");
      }
    });
  });
  return (
    <HeaderArea>
      <HeaderLogo>로고</HeaderLogo>
      <SearchBox>
        <UserSearch type="text" className="searchBar" />
        <SvgBox>
          <FaSearch style={{ width: "30px", height: "30px", fill: "#fff" }} />
        </SvgBox>
      </SearchBox>
      <UserProfileBox
        onClick={() => {
          setClickProfileState(!clickUserProfile);
        }}
      >
        <UserProfileArea>
          <UserProfile
            className="userProfile"
            ref={userProfile}
            alt="프로필 영역"
          />
          <UserNameBox>
            <UserName ref={userName}></UserName>
          </UserNameBox>
          {clickUserProfile && (
            <UserProfileClick>
              <UserProfile
                className="userProfile"
                alt="프로필 영역"
                ref={profileClickProfile}
              />
              <UserInfoBox>
                <ClickUserName ref={profileClickName}></ClickUserName>
                <UserEmail ref={profileClickEmail}></UserEmail>
                <SettingAndLogOutBox>
                  <MoveUserSetting to={"/UserSetting"}>
                    개인설정
                  </MoveUserSetting>
                  <LogOutButotn onClick={LogOut}>로그아웃</LogOutButotn>
                </SettingAndLogOutBox>
              </UserInfoBox>
            </UserProfileClick>
          )}
        </UserProfileArea>
      </UserProfileBox>
    </HeaderArea>
  );
}

const HeaderArea = styled.header`
  width: 100%;
  height: 100px;
  padding-left: 60px;
  padding-right: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0px;
  left: 0;
  z-index: 999;
  background-color: ${Common.color.backgroundColor};
  box-sizing: border-box;
`;

const HeaderLogo = styled.div`
  color: white;
`;

const UserProfileBox = styled.div`
  position: relative;
  display: flex;
  color: white;
  cursor: pointer;
`;

const UserProfileArea = styled.figure`
  height: 50px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserProfile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

const UserNameBox = styled.div`
  width: 130px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const UserName = styled.span`
  font-size: 17px;
  margin-left: 10px;
  width: 20px;
`;

const UserProfileClick = styled.div`
  padding: 30px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 68px;
  left: -149px;
  background-color: #999;
  box-shadow: 0 0 10px #777;
  border-radius: 15px;
  cursor: auto;
`;

const UserInfoBox = styled.div`
  line-height: 1.6;
  font-weight: 600;
  margin-left: 25px;
`;

const MoveUserSetting = styled(Link)`
  color: black;
  font-weight: 600;
  font-size: 13px;
  &:active {
    color: black;
  }

  &:focus {
    color: black;
  }
`;

const SettingAndLogOutBox = styled.div`
  width: 100%;
  display: flex;
`;

const LogOutButotn = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  font-weight: 800;
`;

const ClickUserName = styled(UserName)`
  color: black;
  font-size: 16px;
  margin-left: 0;
`;

const UserEmail = styled.p`
  font-size: 17px;
  font-weight: 500;
  color: black;
`;

const SearchBox = styled.form`
  position: relative;
`;

const SvgBox = styled.button`
  width: 70px;
  height: 100%;
  background-color: #222222;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  cursor: pointer;
`;

const UserSearch = styled.input`
  width: 660px;
  height: 50px;
  border-radius: 30px;
  border: 1px solid #303030;
  background-color: #121212;
  outline: none;
  color: #d8d9cf;
  box-sizing: border-box;
  padding: 0 96px 0 26px;
  margin-left: 73px;
`;
