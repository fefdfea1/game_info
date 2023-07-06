const Client_id = process.env.REACT_APP_CLIENT_ID;
const Client_token = process.env.REACT_APP_CLIENT_TOKEN;

var myHeaders = new Headers();
myHeaders.append("Client-ID", `${Client_id}`);
myHeaders.append("Authorization", `Bearer ${Client_token}`);
myHeaders.append("Content-Type", "application/json");

export type returnDataType = {
  checksum: string;
  game: number;
  id: number;
  name: string;
  video_id: string;
}[];

export const gamesearch = (data: number) => {
  const response = fetch("/v4/games/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${Client_id}`,
      Authorization: `Bearer ${Client_token}`,
    },
    body: `fields *; where id = ${data};`,
  })
    .then((data) => data.json())
    .then((result) => {
      console.log(result);
    });
  return response;
};

export const gameScreenShotSearch = (data: number) => {
  const response = fetch("/v4/games/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${Client_id}`,
      Authorization: `Bearer ${Client_token}`,
    },
    body: `fields screenshots.*; where id = ${data};`,
  })
    .then((data) => data.json())
    .then((result) => {
      console.log(result);
    });
  return response;
};

export const CoverDataFetch = (data: number) => {
  const response = fetch("/v4/games", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${Client_id}`,
      Authorization: `Bearer ${Client_token}`,
    },
    body: `fields cover.*; where id = ${data};`,
  })
    .then((data) => data.json())
    .then((result) => {
      console.log(result);
    });
  return response;
};

export const gamesortUp = () => {
  const response = fetch("/v4/release_dates/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${Client_id}`,
      Authorization: `Bearer ${Client_token}`,
    },

    // 1688655600000
    body: "fields *; limit 30; where game.platforms = (6) & date > 1688655600000; sort date desc;",
  });

  return response;
};

export const gamesortDown = () => {
  const response = fetch("/v4/release_dates/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${Client_id}`,
      Authorization: `Bearer ${Client_token}`,
    },

    body: "fields *; limit 30; where game.platforms = (6) & date > 1688655600000; sort date asc;",
  });

  return response;
};

export const videoDataFetch = (data: number) => {
  const response = fetch("/v4/game_videos", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${Client_id}`,
      Authorization: `Bearer ${Client_token}`,
    },
    body: `fields *; where id = ${data};`,
  });

  return response;
};
