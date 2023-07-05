import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import Detailpage from "./component/DetailPage/Detailpage";
import { useEffect } from "react";
import axios from "axios";
const Client_id = process.env.REACT_APP_CLIENT_ID;
const Secret_key = process.env.REACT_APP_SECRET_KEY;
const Client_token = process.env.REACT_APP_CLIENT_TOKEN;

function App() {
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Client-ID", `${Client_id}`);
    myHeaders.append("Authorization", `Bearer ${Client_token}`);
    myHeaders.append("Content-Type", "application/json");
    const dataFetch = () => {
      fetch("/v4/game_videos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Client-ID": `${Client_id}`,
          Authorization: `Bearer ${Client_token}`,
        },
        body: "fields *; ",
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => {
          console.log(err);
        });
    };
    dataFetch();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/:id" element={<Detailpage />} />
    </Routes>
  );
}

export default App;
