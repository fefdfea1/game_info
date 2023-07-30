const Client_id = process.env.REACT_APP_CLIENT_ID;
const Client_token = process.env.REACT_APP_CLIENT_TOKEN;

var myHeaders = new Headers();
myHeaders.append("Client-ID", `${Client_id}`);
myHeaders.append("Authorization", `Bearer ${Client_token}`);
myHeaders.append("Content-Type", "application/json");

export type searchDataType = {
  similar_games: {
    name: string;
    id: number;
  }[];
  aggregated_rating: number;
  language_supports: {
    language: number;
    language_support_type: number;
  };
  checksum: string;
  cover: {
    image_id: string;
  };
  first_release_date: number;
  game_modes: {
    name: string;
    slug: string;
    id: number;
  }[];
  id: number;
  name: string;
  platforms: {
    name: string;
    abbreviation: string;
    id: number;
  }[];
  screenshots: {
    image_id: string;
    id: number;
  }[];
  summary: string;
  videos: {
    video_id: string;
    id: number;
  }[];
  genres: {
    name: string;
    id: number;
  }[];
  total_rating: number;
}[];

export type retrunDataType = {
  checksum: string;
  cover: string;
  first_release_date: number;
  game_modes: string;
  id: number;
  platforms: React.ReactNode[];
  screenshots: string;
  summary: string;
  videos: string;
  genres: string[];
  name: string;
  total_rating: number | string;
};

export function gamesearch(data: string) {
  const response = fetch("/v4/games/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${Client_id}`,
      Authorization: `Bearer ${Client_token}`,
    },
    body: `fields cover.*,platforms.*,name,summary,videos.*,game_modes.*,screenshots.*,first_release_date,checksum,genres.*,language_supports.*,aggregated_rating,total_rating,similar_games.*; limit: 16; where id = (${data});`,
  });
  return response.then((res) => res.json());
}

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

    body: `fields *; limit ${limit}; offset ${
      limit * page
    }; where game.platforms = (48,49,6) & date < ${date}; sort date desc;`,
  });

  return response.then((res) => res.json());
};

export const getTagData = (data: string) => {
  const response = fetch("/v4/games", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${Client_id}`,
      Authorization: `Bearer ${Client_token}`,
    },
    body: `fields genres.*; where id = (${data});`,
  });

  return response.then((res) => res.json());
};

export const sortRatingData = (
  date: number,
  page: number = 1,
  limit: number = 1
) => {
  const response = fetch("/v4/games", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${Client_id}`,
      Authorization: `Bearer ${Client_token}`,
    },
    body: `fields cover.*,platforms.*,name,summary,videos.*,game_modes.*,screenshots.*,first_release_date,checksum,genres.*,total_rating,rating; sort rating desc; limit: ${limit}; 
    where rating != null & release_dates.date > ${date}; offset ${
      page * limit
    }; `,
  });

  return response.then((res) => res.json());
};

export const containPcPlatforms = (
  date: number,
  page: number = 1,
  limit: number = 1
) => {
  const response = fetch("/v4/games", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${Client_id}`,
      Authorization: `Bearer ${Client_token}`,
    },
    body: `fields cover.*,platforms.*,name,summary,videos.*,game_modes.*,screenshots.*,first_release_date,checksum,genres.*,total_rating,rating;  limit: ${limit}; where release_dates.date > ${date} & platforms = (6); offset ${
      page * limit
    }; sort first_release_date desc;`,
  });

  return response.then((res) => res.json());
};

export const containPsPlatform = (
  date: number,
  page: number = 1,
  limit: number = 1
) => {
  const response = fetch("/v4/games", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${Client_id}`,
      Authorization: `Bearer ${Client_token}`,
    },
    body: `fields cover.*,platforms.*,name,summary,videos.*,game_modes.*,screenshots.*,first_release_date,checksum,genres.*,total_rating,rating;  limit: ${limit}; where release_dates.date > ${date} & platforms = (167,48); offset ${
      page * limit
    }; sort first_release_date desc;`,
  });

  return response.then((res) => res.json());
};

export const containXboxPlatform = (
  date: number,
  page: number = 1,
  limit: number = 1
) => {
  const response = fetch("/v4/games", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${Client_id}`,
      Authorization: `Bearer ${Client_token}`,
    },
    body: `fields cover.*,platforms.*,name,summary,videos.*,game_modes.*,screenshots.*,first_release_date,checksum,genres.*,total_rating,rating;  limit: ${limit}; where release_dates.date > ${date} & platforms = (169); offset ${
      page * limit
    }; sort first_release_date desc;`,
  });

  return response.then((res) => res.json());
};

export const searchGame = (searchData: string, limit: string) => {
  const response = fetch("/v4/games", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${Client_id}`,
      Authorization: `Bearer ${Client_token}`,
    },
    body: `fields name,cover.*,platforms.*; search "${searchData}"; where version_parent = null; limit: ${limit}; `,
  });
  return response.then((res) => res.json());
};
