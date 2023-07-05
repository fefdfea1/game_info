import styled from "@emotion/styled";
import Header from "./component/Header";
import Slider from "./component/Slider";
import MainPageVideo from "./component/MainPageVideo";
import { Common } from "./common/variable";

export default function Main() {
  return (
    <Container className="container">
      <Header />
      <Slider />
      <MainPageVideo />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${Common.color.backgroundColor};
  position: relative;
`;
