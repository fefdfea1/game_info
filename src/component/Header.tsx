import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";
import { Common } from "../common/variable";
export default function Header() {
  return (
    <HeaderArea>
      <HeaderLogo>로고</HeaderLogo>
      <SearchBox>
        <UserSearch type="text" className="searchBar" />
        <SvgBox>
          <FaSearch style={{ width: "30px", height: "30px", fill: "#fff" }} />
        </SvgBox>
      </SearchBox>
      <UserProfileBox>
        <UserProfileImgArea>
          <UserProfile
            src="https://png.pngtree.com/png-vector/20191115/ourmid/pngtree-beautiful-profile-line-vector-icon-png-image_1990469.jpg"
            alt="프로필 영역"
          />
          <UserNameBox>
            <UserName>김창규ddddddddddddddddddd</UserName>
          </UserNameBox>
        </UserProfileImgArea>
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
  background-color: ${Common.color.backgroundColor};
  box-sizing: border-box;
`;

const HeaderLogo = styled.div`
  color: white;
`;

const UserProfileBox = styled.div`
  display: flex;
  color: white;
  cursor: pointer;
`;

const UserProfileImgArea = styled.figure`
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
