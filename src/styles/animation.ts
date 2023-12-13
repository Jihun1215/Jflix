import { keyframes } from 'styled-components';

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

export const toLeft = keyframes`
0% {
  opacity: 0;
  transform: translateX(-50%);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
`;

export const toRight = keyframes`
0% {
  opacity: 0;
  transform: translateX(50%);
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

export const downmodal = keyframes`
  0% {
   transform: scale(1);
  }
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(0);
  }
`;

export const upmodal = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
`;
