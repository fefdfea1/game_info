import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";
import { Common } from "../../common/variable";
import { appAuth, appFireStore } from "../../common/fireBaseSettion";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { LogOut } from "../../SignUp_SignIn/LogOut";
import { search } from "./search";

export type searchDataType = {
  cover: {
    image_id: string;
  };
  id: number;
  name: string;
};

export default function Header() {
  const userProfile = useRef<HTMLImageElement>(null);
  const userName = useRef<HTMLSpanElement>(null);
  const profileClickProfile = useRef<HTMLImageElement>(null);
  const profileClickName = useRef<HTMLSpanElement>(null);
  const profileClickEmail = useRef<HTMLParagraphElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const [clickUserProfile, setClickProfileState] = useState<boolean>(false);
  const [getSearchData, setData] = useState<searchDataType[]>([]);
  const [backgroundClick, setBackgroundClickState] = useState<boolean>(true);

  const clickEventHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    console.log(target);
    if (
      target.classList.contains("videoAreaContainer") ||
      target.classList.contains("header")
    ) {
      setBackgroundClickState(false);
    }
  };

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
            console.log(getUserInfo.userProfileImg);
            profileClickProfile.current.src = getUserInfo.userProfileImg;
            profileClickName.current.innerText = getUserInfo.userName;
            profileClickEmail.current.innerText = `(${getUserInfo.userEmail})`;
          }
        }
      } else {
        console.log("로그아웃");
      }
    });
  }, [clickUserProfile]);
  useEffect(() => {
    window.addEventListener("click", clickEventHandler);
    return () => {
      window.removeEventListener("click", clickEventHandler);
    };
  }, []);
  return (
    <HeaderArea className="header">
      <HeaderLogo>로고</HeaderLogo>
      <SearchBox>
        <UserSearch
          type="text"
          className="searchBar"
          ref={searchInput}
          onChange={(event) => {
            search(event, searchInput, setData, setBackgroundClickState);
          }}
        />
        <SvgBox>
          <FaSearch style={{ width: "30px", height: "30px", fill: "#fff" }} />
        </SvgBox>
        {backgroundClick && getSearchData.length > 0 ? (
          <SearchResultBox>
            {getSearchData.map((item) => {
              return (
                <SearchLink to={`/detail/${item.id}`}>
                  <SearchCoverImgBox>
                    {item.cover !== undefined ? (
                      <SearchCoverImg
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.image_id}.jpg`}
                        alt="게임 커버이미지 사진"
                      />
                    ) : (
                      <SearchCoverImg
                        src={`img/OIP.jpg`}
                        alt="게임 커버이미지"
                      />
                    )}
                  </SearchCoverImgBox>
                  <SearchGameName>{item.name}</SearchGameName>
                </SearchLink>
              );
            })}
          </SearchResultBox>
        ) : null}
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

const SearchBox = styled.form`
  position: relative;
`;

const SearchResultBox = styled.ul`
  width: 70%;
  height: 350px;
  position: absolute;
  top: 54px;
  left: 135px;
  overflow-y: auto;
  background-color: #999;
`;

const SearchLink = styled(Link)`
  width: 100%;
  height: 100px;
  display: block;
  border: 1px solid black;
  box-sizing: border-box;
  display:flex;
  align-items:center;
  overflow-hidden;
  padding: 0 30px;
`;

const SearchCoverImgBox = styled.figure`
  width: 90px;
  height: 80px;
  display:flex;
  justify-content:center;
  align-items:center;
  overflow-hidden;
`;

const SearchCoverImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

const SearchGameName = styled.p`
  width: 70%;
  font-size: 19px;
  font-weight: 600;
  color: black;
  margin-left: 30px;
  line-height: 0.9;
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
