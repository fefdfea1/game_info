const Client_id = process.env.REACT_APP_CLIENT_ID;
const Client_token = process.env.REACT_APP_CLIENT_TOKEN;

var myHeaders = new Headers();
myHeaders.append("Client-ID", `${Client_id}`);
myHeaders.append("Authorization", `Bearer ${Client_token}`);
myHeaders.append("Content-Type", "application/json");

export type searchDataType = {
  cover: number;
  first_release_date: number;
  game_modes: number[];
  language_supports: number[];
  name: string;
  platforms: number[];
  screenshots: number[];
  summary: string;
  tage: number[];
  videos?: number[] | string;
};

export type sortDataType = {
  category: number;
  checksum: string;
  created_at: number;
  date: number;
  game: number;
  human: string;
  id: number;
  m: number;
  platform: number;
  region: number;
  status: number;
  updated_at: number;
  videos: number[];
  websites: string;
  y: number;
}[];

export function gamesearch(data: string) {
  const response = fetch("/v4/games/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${Client_id}`,
      Authorization: `Bearer ${Client_token}`,
    },
    body: `fields *; limit: 20; where id = (${data});`,
  });
  return response;
}

export const gameScreenShotSearch = (data: number) => {
  const response = fetch("/v4/games/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${Client_id}`,
      Authorization: `Bearer ${Client_token}`,
    },
    body: `fields screenshots.*; where id = ${data};`,
  });

  return response;
};

export const CoverDataFetch = (data: string) => {
  const response = fetch("/v4/games", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${Client_id}`,
      Authorization: `Bearer ${Client_token}`,
    },
    body: `fields cover.*; limit 20; where id = (127272);`,
  });

  return response;
};

export const gamesortUp = (
  date: number,
  page: number = 1,
  limit: number = 1
) => {
  const response = fetch("/v4/release_dates/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${Client_id}`,
      Authorization: `Bearer ${Client_token}`,
    },

    body: `fields *; limit ${limit}; offset ${page}; where game.platforms = (48,49,6) & date < ${date}; sort date desc;`,
  });

  return response.then((res) => res.json());
};

export const gamesortDown = (date: number) => {
  const response = fetch("/v4/release_dates/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${Client_id}`,
      Authorization: `Bearer ${Client_token}`,
    },

    body: `fields *; limit 30; where game.platforms = (6) & date < ${date}; sort date asc;`,
  });

  return response;
};

export const videoDataFetch = (data: string) => {
  const response = fetch("/v4/game_videos", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${Client_id}`,
      Authorization: `Bearer ${Client_token}`,
    },
    body: `fields *; where id = (${data});`,
  });

  return response.then((res) => res.json());
};
