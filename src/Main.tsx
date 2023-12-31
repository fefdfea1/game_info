import styled from "@emotion/styled";
import Header from "./component/Header/Header";
import LogOutHeader from "./component/Header/LogoutHeader";
import Slider from "./component/sideSlider/Slider";
import MainPageVideo from "./component/MainPage/MainPageVideo";
import { useState, useEffect } from "react";
import { retrunDataType } from "./dataFetch/getGameData";
import { onAuthStateChanged } from "firebase/auth";
import { appAuth } from "./common/fireBaseSetting";

export default function Main() {
  const [searchData, setSearch] = useState<retrunDataType[]>([]);
  const [changeSortState, setSortState] = useState<boolean>(false);
  const [loginState, setLoginState] = useState<boolean>(false);
  useEffect(() => {
    onAuthStateChanged(appAuth, (user) => {
      if (user) {
        setLoginState(true);
      } else {
        setLoginState(false);
      }
    });
  });

  return (
    <Container className={`${changeSortState ? "blind" : null}`}>
      {loginState ? <Header /> : <LogOutHeader />}
      <Slider
        setSearch={setSearch}
        setSortState={setSortState}
        LoginState={loginState}
      />
      <MainPageVideo searchData={searchData} setSearch={setSearch} />
      {changeSortState && (
        <ChangeDataLoading className={`${changeSortState ? "active" : null}`}>
          <Spinner />
        </ChangeDataLoading>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: var(--backgroundColor);
  &.hideChangeSort {
    height: 100vh;
    overflow: hidden;
  }

  &.blind {
    height: 100vh;
    overflow: hidden;
  }
`;

const ChangeDataLoading = styled.div`
  position: absolute;
  transition: all 0.3s;
  background: black;
  &.active {
    width: 100%;
    height: 100vh;
    z-index: 9999;
    top: 0;
    left: 0;
  }
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 5px solid #ccc;
  border-top-color: #888;
  border-radius: 50%;
  animation: spin 1s infinite linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
