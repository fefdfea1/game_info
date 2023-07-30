import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function LogOutHeader() {
  const navigate = useNavigate();
  return (
    <HeaderArea className="header">
      <HeaderLogo>로고</HeaderLogo>
      <SearchBox>
        <UserSearch type="text" className="searchBar" />
        <SvgBox>
          <FaSearch style={{ width: "30px", height: "30px", fill: "#fff" }} />
        </SvgBox>
      </SearchBox>
      <UserProfileBox
        onClick={() => {
          navigate("/LoginPage");
        }}
      >
        로그인하기
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
  background-color: var(--backgroundColor);
  box-sizing: border-box;
`;

const HeaderLogo = styled.div`
  color: var(--colorWhite);
`;

const UserProfileBox = styled.div`
  display: flex;
  color: var(--colorWhite);
  cursor: pointer;
`;

const SearchBox = styled.form`
  position: relative;
`;

const SvgBox = styled.button`
  width: 70px;
  height: 100%;
  background-color: var(--darkGray);
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
  background-color: var(--searchBoxBackgroundColor);
  outline: none;
  color: var(--userSearchFontColor);
  box-sizing: border-box;
  padding: 0 96px 0 26px;
  margin-left: 73px;
`;
