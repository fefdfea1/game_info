import Youtube from "react-youtube";
import { retrunDataType } from "../../dataFetch/getGameData";
import { useState } from "react";

type propsType = {
  item: retrunDataType;
  index: number;
  OverState: boolean;
  OverDomIndex: number;
  coverImgBox: React.RefObject<HTMLDivElement>;
};

export default function YoutubeVideoPlayer(props: propsType) {
  return (
    <Youtube
      key={`${props.item.videos}`}
      videoId={`${
        props.OverState && props.index === props.OverDomIndex
          ? props.item.videos
          : null
      }`}
      className="video"
      opts={{
        width: "400",
        height: "270",
        playerVars: {
          rel: 0,
          modestbranding: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          autoplay: 1,
          mute: 1,
        },
      }}
      onReady={() => {
        if (props.coverImgBox.current) {
          const target = props.coverImgBox.current as HTMLDivElement;
          const rootContainer = target.closest(".videoAreaContainer");
          if (
            props.OverState &&
            props.OverDomIndex === props.index &&
            props.item.videos !== "null"
          ) {
            if (rootContainer !== null) {
              const targetImgBox = rootContainer.childNodes[props.index]
                .childNodes[0].childNodes[0].childNodes[1] as HTMLDivElement;
              targetImgBox.style.opacity = "0";
            }
          }
        }
      }}
      onEnd={(e) => {
        e.target.stopVideo(0);
      }}
    />
  );
}
