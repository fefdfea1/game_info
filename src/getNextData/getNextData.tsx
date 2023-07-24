import {
  gamesortUp,
  gamesearch,
  searchDataType,
  retrunDataType,
  sortRatingData,
  containPcPlatforms,
  containPsPlatform,
  containXboxPlatform,
} from "../dataFetch/getGameData";
import { RiSwitchLine, RiXboxLine } from "react-icons/ri";
import { SiOculus, SiPlaystation4, SiPlaystation5 } from "react-icons/si";
import { FaLinux } from "react-icons/fa";
import { AiOutlineApple, AiOutlineWindows } from "react-icons/ai";

export type sortGameTpye = {
  category: number;
  checksum: string;
  created_at: number;
  cover: number | string;
  date: number;
  game: number;
  human: string;
  id: number;
  m: number;
  platform: number;
  reguin: number;
  status: number;
  updated_at: number;
  y: number;
}[];

type newObjType = {
  checksum: string;
  cover: string;
  first_release_date: number;
  game_modes: string;
  id: number;
  name: string;
  platforms: React.ReactNode[];
  screenshots: string;
  videos: string;
  summary: string;
  genres: string[];
  total_rating: number | string;
};

type getNextDataType = (
  UnixTime: number,
  page: number,
  limit: number,
  type?: string
) => any;
export const getNextData: getNextDataType = async (
  UnixTime,
  page,
  limit,
  type = "default"
) => {
  page += 1;
  let filterDataArr: sortGameTpye = [];
  let returnData: retrunDataType[] = [];
  let getSearchData: searchDataType = [];
  const gameId: string[] = [];

  const filterGame = async (data: sortGameTpye) => {
    filterDataArr.push(...data);
    //중복되어 나오는 게임이 많아 필터링을 거침(불러오는 게임의 수가 항상 다름)
    let filterData = filterDataArr.filter(
      (element: any, index: any, callback: any) => {
        return (
          index === callback.findIndex((t: any) => t.game === element.game)
        );
      }
    );
    filterDataArr = filterData;
  };

  const platformSvg = (platformData: string[]) => {
    const IconBox: React.ReactNode[] = [];
    platformData.forEach((data) => {
      switch (data) {
        case "Linux":
          IconBox.push(<FaLinux style={{ width: "30px", height: "30px" }} />);
          break;
        case "PC (Microsoft Windows)":
          IconBox.push(
            <AiOutlineWindows style={{ width: "30px", height: "30px" }} />
          );
          break;
        case "Mac":
          IconBox.push(
            <AiOutlineApple style={{ width: "30px", height: "30px" }} />
          );
          break;
        case "PlayStation 4":
          IconBox.push(
            <SiPlaystation4 style={{ width: "30px", height: "30px" }} />
          );
          break;
        case "Nintendo Switch":
          IconBox.push(
            <RiSwitchLine style={{ width: "30px", height: "30px" }} />
          );
          break;
        case "PlayStation 5":
          IconBox.push(
            <SiPlaystation5 style={{ width: "30px", height: "30px" }} />
          );
          break;
        case "Xbox Series X|S":
          IconBox.push(
            <RiXboxLine style={{ width: "30px", height: "30px" }} />
          );
          break;
        case "Meta Quest 2":
          IconBox.push(<SiOculus style={{ width: "30px", height: "30px" }} />);
          break;
      }
    });
    return IconBox;
  };

  if (type === "default") {
    const nextData = await gamesortUp(UnixTime, page, limit);
    filterGame(nextData);
    filterDataArr.forEach((item) => {
      gameId.push(item.game.toString());
    });
    getSearchData = await gamesearch(gameId.join(","));
  } else if (type === "sortRating") {
    const nextData = await sortRatingData(UnixTime - 315532800, page, limit);
    getSearchData = nextData;
  } else if (type === "sortContainPc") {
    const nextData = await containPcPlatforms(
      UnixTime - 315532800,
      page,
      limit
    );
    getSearchData = nextData;
  } else if (type === "sortContainPs") {
    const nextData = await containPsPlatform(UnixTime - 315532800, page, limit);
    getSearchData = nextData;
  } else if (type === "sortContainXbox") {
    const nextData = await containXboxPlatform(
      UnixTime - 315532800,
      page,
      limit
    );
    getSearchData = nextData;
  }

  getSearchData.forEach((item) => {
    let platformString = "";
    const newObj: newObjType = {
      checksum: "",
      cover: "",
      first_release_date: 1,
      game_modes: "",
      id: 1,
      name: "",
      platforms: [],
      screenshots: "",
      videos: "",
      summary: "",
      genres: [""],
      total_rating: 1,
    };
    newObj.checksum = item.checksum;
    if (item.cover !== undefined) {
      newObj.cover = `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${item.cover.image_id}.jpg`;
    } else {
      newObj.cover = "null";
    }
    if (item.first_release_date !== undefined) {
      newObj.first_release_date = item.first_release_date;
    } else {
      newObj.first_release_date = 0;
    }
    if (item.game_modes !== undefined) {
      newObj.game_modes = item.game_modes[0].name;
    } else {
      newObj.game_modes = "null";
    }
    newObj.id = item.id;
    newObj.name = item.name;
    item.platforms.forEach((result, index) => {
      if (item.platforms.length === index + 1) {
        platformString += result.name;
      } else {
        platformString += result.name + ",";
      }
    });
    newObj.platforms = platformSvg(platformString.split(","));
    if (item.screenshots !== undefined && item.screenshots.length >= 1) {
      item.screenshots.forEach((result, index) => {
        if (item.screenshots.length > index + 1) {
          newObj.screenshots += result.image_id + ",";
        } else {
          newObj.screenshots += result.image_id;
        }
      });
    }
    if (item.videos !== undefined) {
      newObj.videos = item.videos[0].video_id;
    } else {
      newObj.videos = "null";
    }
    newObj.summary = item.summary;
    if (item.genres !== undefined) {
      let genresTagArr = "";
      item.genres.forEach((result, index) => {
        if (item.genres.length > index + 1) {
          genresTagArr += result.name + ",";
        } else {
          genresTagArr += result.name;
        }
      });
      newObj.genres = genresTagArr.split(",");
    }
    if (item.total_rating) {
      newObj.total_rating = item.total_rating;
    } else {
      newObj.total_rating = "null";
    }

    returnData.push(newObj);
  });

  return { returnData, page };
};
