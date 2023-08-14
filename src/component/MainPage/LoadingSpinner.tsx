import styled from "@emotion/styled";
import React from "react";

type EmotionpropsType = {
  position: string;
  left: string;
  top: string;
};

export default React.forwardRef<HTMLDivElement, EmotionpropsType>(
  (props, ref) => {
    return (
      <>
        <LoadingSpinnerDom
          className="loading-spinner"
          ref={ref}
          position={props.position}
          top={props.top}
          left={props.left}
        >
          <Spinner
            className="spinner"
            position={props.position}
            top={props.top}
            left={props.left}
          ></Spinner>
        </LoadingSpinnerDom>
      </>
    );
  }
);

const LoadingSpinnerDom = styled.div<EmotionpropsType>`
  position: ${(props) => props.position};
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const Spinner = styled.div<EmotionpropsType>`
  width: 50px;
  height: 50px;
  position: ${(props) => props.position};
  left: ${(props) => props.left};
  top: ${(props) => props.top};
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
