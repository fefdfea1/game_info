import { Route, Routes } from "react-router-dom";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { retrunDataType } from "./dataFetch/getGameData";
import Main from "./Main";
import Detailpage from "./component/DetailPage/Detailpage";
import LoginPage from "./component/LoginPage/LoginPage";
import UserSetting from "./component/PersonalSetting/UserSetting";
import OauthSigUp from "./SignUp_SignIn/OauthSigUp";

export type initType = {
  page: number;
  limit: number;
  Nowunix: number;
  gameData: retrunDataType[];
  nowDataType: string;
};

const init: initType = {
  page: 0,
  limit: 20,
  Nowunix: Math.floor(new Date().getTime() / 1000),
  gameData: [],
  nowDataType: "default",
};

const counterSlice = createSlice({
  name: "counter",
  initialState: init,
  reducers: {
    pageUp: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimitOption: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },

    cachData: (state, action: PayloadAction<retrunDataType[]>) => {
      state.gameData = action.payload;
    },

    changeType: (state, action: PayloadAction<string>) => {
      state.nowDataType = action.payload;
    },
  },
});

let store = configureStore({
  reducer: {
    counter1: counterSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export let { pageUp, setLimitOption, cachData, changeType } =
  counterSlice.actions;

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detailpage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/UserSetting" element={<UserSetting />} />
        <Route path="/OauthSignUp" element={<OauthSigUp />}></Route>
      </Routes>
    </Provider>
  );
}

export default App;
