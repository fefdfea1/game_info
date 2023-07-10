import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useGetVideoUrl } from "../changeVideoId/changeVideoId";
import { searchDataType } from "../dataFetch/getGameData";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../App";
export default function MainPageVideo() {
  const selector = useSelector((state: RootState) => state.counter1);
  const [searchData, setSearch] = useState<searchDataType[]>([]);
  const [loadingState, setState] = useState<Boolean>(false);

  const getVideoData = useGetVideoUrl(
    selector.Nowunix,
    selector.page,
    selector.limit
  );

  useEffect(() => {
    if (getVideoData) {
      setSearch(getVideoData);
    }
  }, [getVideoData]);

  if (getVideoData === undefined) return <></>;
  return (
    <>
      <VideoAreaContainer className="videoAreaContainer">
        {getVideoData.length > 1 ? (
          getVideoData.map((item, index) => {
            const hasVideoUrl = item.hasOwnProperty("videos");
            if (searchData.length > 1) {
              return (
                <VideoContainer className="videoContainer" key={index}>
                  <Link to={`/${index}`}>
                    <VideoBox>
                      {hasVideoUrl ? (
                        <Video
                          src={`https://www.youtube.com/embed/${item.videos}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          rel="0"
                        />
                      ) : (
                        <NonVideoImgbox>
                          <NonVideoImg
                            src="img/noVideo.png"
                            alt="비디오 없음 이미지"
                          ></NonVideoImg>
                        </NonVideoImgbox>
                      )}
                    </VideoBox>
                    <GameTagBox className="gameTag">
                      <p>platform</p>
                      <p>tag</p>
                    </GameTagBox>
                    <GameTitleBox className="gameTitle">
                      <p>{item.name}</p>
                    </GameTitleBox>
                  </Link>
                </VideoContainer>
              );
            }
          })
        ) : (
          <></>
        )}
      </VideoAreaContainer>
      {loadingState ? (
        <Loading_spinner className="loading-spinner">
          <Spinner className="spinner"></Spinner>
        </Loading_spinner>
      ) : (
        <></>
      )}
    </>
  );
}

const VideoAreaContainer = styled.section`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, auto));
  grid-template-rows: repeat(3, minmax(300px, auto));
  flex-wrap: wrap;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 3%;
  gap: 0 2%;
`;

const VideoContainer = styled.div`
  box-sizing: border-box;
  padding: 0 0 20px 0;
  margin: 70px 1%;
  &:hover a .videoBox iframe {
    height: 340px;
  }
`;

const VideoBox = styled.div`
  width: 100%;
  height: 300px;
  pointer-events: none;
`;

const Video = styled.iframe`
  width: 100%;
  height: 100%;
  transition: all 0.2s;
`;

const GameTagBox = styled.div`
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0 27px;
  box-sizing: border-box;
  font-size: 14px;
  text-align: right;
`;

const GameTitleBox = styled.div`
  font-size: 20px;
  color: #fff;
  margin-top: 15px;
  text-align: center;
`;

const NonVideoImgbox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NonVideoImg = styled.img`
  width: 70%;
  height: 70%;
  object-fit: contain;
`;

const Loading_spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top-color: #888;
  border-radius: 50%;
  animation: spin 1s infinite linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
