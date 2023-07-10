import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import Detailpage from "./component/DetailPage/Detailpage";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { searchDataType } from "./dataFetch/getGameData";

type initType = {
  page: number;
  limit: number;
  Nowunix: number;
  gameData: searchDataType[];
};

const init: initType = {
  page: 1,
  limit: 15,
  Nowunix: Math.floor(new Date().getTime() / 1000),
  gameData: [],
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
    cachData: (state, action: PayloadAction<searchDataType[]>) => {
      state.gameData = action.payload;
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

export let { pageUp, setLimitOption, cachData } = counterSlice.actions;

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Detailpage />} />
      </Routes>
    </Provider>
  );
}

export default App;
