import { keyframes } from "styled-components";

export const tooltipAnimation = keyframes`
  0% { opacity: 0; }
  40% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 1; }
`;

export const tooltipMoveAnimation = keyframes`
0% { transform: translateY(0px); }
40% { transform: translateY(-6px); }
50% {transform: translateY(-10px); }
100% { transform: translateY(0px); }
`;

export const toDown = keyframes`
0% {
  opacity: 0;
  transform: translateY(-50%);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
`;

export const toUp = keyframes`
0% {
  opacity: 0;
  transform: translateY(50%);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
`;

export const upAndDown = keyframes`
  0% {
    transform: translate(-17%,-20%);
  }
  50% {
    transform: translate(-17%,-25%);
  }
  100% {
    transform: translate(-17%,-20%);
  }
`;
