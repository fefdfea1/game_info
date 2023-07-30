import { gamesearch } from "../../dataFetch/getGameData";
import { searchDataType } from "../../dataFetch/getGameData";
import { Unix_timestamp } from "./changeUnixTime";

export const getGameInfo = async (location: any) => {
  const spliceLocation = location.pathname.slice(8);
  const getGameData = await gamesearch(spliceLocation);
  console.log(getGameData);
  const filterData = filterOutData(getGameData);
  return filterData;
};

const filterOutData = (data: searchDataType) => {
  let game_modes = "";
  let genres = "";
  let platforms = "";
  let screenShots = "";
  let videos = "";
  let similarGames = "";

  let releaseDate = Unix_timestamp(data[0].first_release_date);

  if (data[0].game_modes) {
    data[0].game_modes.forEach((item) => {
      if (data[0].game_modes[data[0].game_modes.length - 1].id === item.id) {
        game_modes += item.name;
      } else {
        game_modes += item.name + ",";
      }
    });
  }

  if (data[0].genres) {
    data[0].genres.forEach((item) => {
      if (data[0].genres[data[0].genres.length - 1].id === item.id) {
        genres += item.name;
      } else {
        genres += item.name + ",";
      }
    });
  }

  if (data[0].platforms) {
    data[0].platforms.forEach((item) => {
      if (data[0].platforms[data[0].platforms.length - 1].id === item.id) {
        platforms += item.abbreviation;
      } else {
        platforms += item.abbreviation + ",";
      }
    });
  }

  if (data[0].screenshots) {
    data[0].screenshots.forEach((item) => {
      if (data[0].screenshots[data[0].screenshots.length - 1].id === item.id) {
        screenShots += item.image_id;
      } else {
        screenShots += item.image_id + ",";
      }
    });
  }

  if (data[0].videos) {
    data[0].videos.forEach((item) => {
      if (data[0].videos[data[0].videos.length - 1].id === item.id) {
        videos += "videoUrl" + item.video_id;
      } else {
        videos += "videoUrl" + item.video_id + ",";
      }
    });
  }

  if (data[0].similar_games) {
    data[0].similar_games.forEach((item) => {
      if (
        data[0].similar_games[data[0].similar_games.length - 1].id === item.id
      ) {
        similarGames += item.name;
      } else {
        similarGames += item.name + ",";
      }
    });
  }

  const filter = {
    metaCritic: data[0].aggregated_rating,
    languageSupport: data[0].language_supports,
    image_id: data[0].cover.image_id,
    first_release_date: releaseDate,
    game_modes: game_modes,
    genres: genres,
    name: data[0].name,
    platform: platforms,
    screenshots: screenShots,
    summary: data[0].summary,
    total_rating: data[0].total_rating,
    video_id: videos,
    similar_games: similarGames,
  };

  return filter;
};
