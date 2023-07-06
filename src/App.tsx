import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import Detailpage from "./component/DetailPage/Detailpage";
import { createContext, useEffect, useState } from "react";
import { returnDataType } from "./dataFetch/getVideoHook";
import { videoDataFetch } from "./dataFetch/getVideoHook";
import { gamesearch } from "./dataFetch/getVideoHook";
import { gamesortUp } from "./dataFetch/getVideoHook";
import { CoverDataFetch } from "./dataFetch/getVideoHook";
import { gameScreenShotSearch } from "./dataFetch/getVideoHook";
import "./dataFetch/getVideoHook";

let date = new Date(1688655600000);
console.log(date);
let d = Date.parse("2023/07/07/");
console.log(d);
// gamesort();
// gameScreenShotSearch(241450);
CoverDataFetch(255676);
export const UserContext = createContext<returnDataType>([]);

function App() {
  useEffect(() => {
    gamesortUp()
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/:id" element={<Detailpage />} />
    </Routes>
  );
}

export default App;
