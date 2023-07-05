import styled from "@emotion/styled";
import { AiOutlineHome } from "react-icons/ai";
import { MdSort } from "react-icons/md";
import { BiVideoRecording } from "react-icons/bi";
import { LiaGamepadSolid } from "react-icons/lia";
import { CiLogin } from "react-icons/ci";
import { BsSun } from "react-icons/bs";
import { Common } from "../common/variable";

interface sliderPropsType {
  clickListNumber: number;
  setClickListNumber: React.Dispatch<React.SetStateAction<number>>;
}

type clickEvnet = (
  event: React.MouseEvent<HTMLLIElement, MouseEvent>,
  props: sliderPropsType
) => void;

const data = [
  [<AiOutlineHome />, "홈", 1],
  [<MdSort />, "정렬", 2],
  [<BiVideoRecording />, "시청 기록", 3],
  [<LiaGamepadSolid />, "관심있는 게임", 4],
  [<BsSun />, "화이트 모드", 5],
  [<CiLogin />, "로그인", 6],
];

const clickEvent: clickEvnet = (event, props) => {
  const target = event.target as HTMLLIElement;
  const dataset = Number(target.dataset.num);
  props.setClickListNumber(dataset);
};

export default function SliderLi(props: sliderPropsType) {
  return (
    <SlideUl>
      {data.map((item, index) => {
        return (
          <SlideItems
            data-num={index}
            key={index}
            onClick={(event) => {
              clickEvent(event, props);
            }}
            className={`
            ${props.clickListNumber === index ? "slidListItemActive" : null}
            `}
          >
            <SlideItemSvg>{item[0]}</SlideItemSvg>
            <SlideItemSpan>{item[1]}</SlideItemSpan>
          </SlideItems>
        );
      })}
    </SlideUl>
  );
}

const SlideItems = styled.li`
  width: calc(100% - 70px);
  display: flex;
  position: relative;
  padding: 25px 0;
  padding-left: 20px;
  margin-left: 50px;
  margin-top: 14px;
  cursor: pointer;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  background-color : transparent;
}

&::before {
  content: "";
  position: absolute;
  top: -20px;
  right: 0;
  width: 20px;
  height: 20px;
  background-color: red;
  border-bottom-right-radius: 20px;
  box-shadow: 5px 5px 0 5px ${Common.color.backgroundColor};
  background-color: transparent;
  display: none;
}

&::after {
  content: "";
  position: absolute;
  bottom: -20px;
  right: 0;
  width: 20px;
  height: 20px;
  background-color: red;
  border-top-right-radius: 20px;
  box-shadow: 5px -5px 0 5px ${Common.color.backgroundColor};
  background-color: transparent;
  display: none;
}

&.active::before,
&.active::after {
  display: block;
}

li:nth-of-type(3){
  border-bottom-right-radius: 28px;
}

li:nth-of-type(3)::after{
  box-shadow: none;
}

li:nth-of-type(4){
  border-top-right-radius: 14px;
}

li:nth-of-type(4)::before{
  box-shadow: none;
}



&.slidListItemActive{
  background-color: ${Common.color.backgroundColor};
  color: #fff;
}
&.slidListItemActive::before{
  display : block;
}
&.slidListItemActive::after{
  display: block
}


`;

const SlideItemSvg = styled.div`
  pointer-events: none;
`;

const SlideItemSpan = styled.span`
  margin-left: 30px;
  pointer-events: none;
`;

const SlideUl = styled.ul`
  width: 100%;
`;
