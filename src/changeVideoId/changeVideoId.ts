import { useEffect, useState, useRef } from "react";
import {
  gamesearch,
  searchDataType,
  videoDataFetch,
} from "../dataFetch/getGameData";
import { gamesortUp } from "../dataFetch/getGameData";
import { useDispatch, useSelector } from "react-redux";
import { pageUp, RootState, cachData } from "../App";

type sortGameTpye = {
  category: number;
  checksum: string;
  created_at: number;
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

export const useGetVideoUrl = (data: number, page: number, limit: number) => {
  const [gameList, setGameList] = useState<searchDataType[]>([]);
  const filterDataGameId: string[] = [];
  const dispatch = useDispatch();
  const selector = useSelector((result: RootState) => result.counter1);
  const nowPageRef = useRef(page);

  const filterGame = (data: sortGameTpye) => {
    const filterData = data.filter(
      (element: any, index: any, callback: any) => {
        return (
          index === callback.findIndex((t: any) => t.game === element.game)
        );
      }
    );
    return filterData;
  };

  useEffect(() => {
    const fetchData = async () => {
      const sortGameData = await gamesortUp(data, nowPageRef.current, limit);
      let filterData = filterGame(sortGameData);
      // 중복되는 게임을 거르고 남는 갯수 만큼의 게임을 더 가져옴
      while (true) {
        if (filterData.length < limit) {
          nowPageRef.current += 1;
          console.log(nowPageRef.current);
          const reData = await gamesortUp(data, nowPageRef.current, limit);
          filterData.push(...reData);
          filterData = filterGame(filterData);
        }
        if (filterData.length >= limit) break;
      }
      await filterData.forEach((item) => {
        filterDataGameId.push(item.game.toString());
      });
      gamesearch(filterDataGameId.join(","))
        .then((res) => res.json())
        .then(async (data) => {
          const sortData = async () => {
            // 제대로된 결과로 join을 위해 모든 비동기 처리가 끝날때까지 기다림
            await Promise.all(
              data.map(async (item: searchDataType, index: number) => {
                if (item.videos !== undefined) {
                  try {
                    const videoData = await videoDataFetch(
                      item.videos[0].toString()
                    );
                    data[index].videos = videoData[0].video_id;
                  } catch (err) {
                    console.log(err);
                    data[index] = "error";
                  }
                } else {
                  data[index].video = "null";
                }
              })
            );
          };
          await sortData();
          setGameList(data);
        });
    };
    //리듀서를 이용하여 캐싱
    if (selector.gameData.length >= limit) {
      setGameList(selector.gameData);
    } else {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, limit]);

  if (gameList.length > 1) {
    dispatch(pageUp(nowPageRef.current));
    dispatch(cachData(gameList));
    return gameList;
  }
};
