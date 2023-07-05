import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export default function MainPageVideo() {
  return (
    <VideoAreaContainer className="videoAreaContainer">
      {Array.from({ length: 10 }).map((item, index) => (
        <VideoContainer className="videoContainer" key={index}>
          <Link to={`/${index}`}>
            <VideoBox className="videoBox">
              <Video src=""></Video>
            </VideoBox>
            <GameTagBox className="gameTag">
              <p>싱글</p>
            </GameTagBox>
            <GameTitleBox className="gameTitle">
              <p>title</p>
            </GameTitleBox>
          </Link>
        </VideoContainer>
      ))}
    </VideoAreaContainer>
  );
}

const VideoAreaContainer = styled.section`
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid red;
  margin: 0 auto;
`;

const VideoContainer = styled.div`
  width: 25%;
  border: 1px solid yellow;
  box-sizing: border-box;
  padding: 0 0 20px 0;
`;

const VideoBox = styled.div`
  width: 100%;
`;

const Video = styled.video`
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
