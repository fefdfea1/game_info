import axios from "axios";
export const getData = () => {
  const Client_id = process.env.REACT_APP_CLIENT_ID;
  const Secret_key = process.env.REACT_APP_SECRET_KEY;
  const Client_token = process.env.REACT_APP_CLIENT_TOKEN;

  const fetchData = async () => {
    const options = {
      method: "POST",
      url: "https://api.igdb.com/v4/games",
      headers: {
        Accept: "application/json",
        "Client-ID": Client_id,
        Authorization: `Bearer ${Client_token}`,
      },
      data: "fields name, summary; limit 5;", // 요청할 필드와 제한 설정
    };

    try {
      const response = await axios(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();

  console.log(Client_id, Secret_key, Client_token);
};
