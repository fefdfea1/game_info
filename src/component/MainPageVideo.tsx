import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

export default function MainPageVideo() {
  const Context = useContext(UserContext);
  return (
    <VideoAreaContainer className="videoAreaContainer">
      {Context.map((item, index) => {
        console.log(item);
        return (
          <VideoContainer className="videoContainer" key={item.id}>
            <Link to={`/${index}`}>
              <VideoBox className="videoBox">
                <Video
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${item.video_id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></Video>
              </VideoBox>
              <GameTagBox className="gameTag">
                <p>싱글</p>
              </GameTagBox>
              <GameTitleBox className="gameTitle">
                <p>title</p>
              </GameTitleBox>
            </Link>
          </VideoContainer>
        );
      })}
    </VideoAreaContainer>
  );
}

const VideoAreaContainer = styled.section`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, auto));
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
`;

const VideoBox = styled.div`
  width: 100%;
`;

const Video = styled.iframe`
  width: 100%;
`;

const GameTagBox = styled.div`
  width: 100%;
  color: #fff;
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
