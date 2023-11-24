import { DefaultTheme, css } from 'styled-components';

const colors: DefaultTheme['colors'] = {
  white: '#FFFFFF',
  black: '#000000',
  black2: '#13161B',
  red: '#f03e3e',
  blue: '#337ab7',
  purple: '#A341FF',
  pink: '#FF5D98',
  yellow: '#F8c707',
  gray: '#9A9A9A',
  greey: '#40c057',
  lightdark: '#13161B',
  lightgreey: '#3FCF8E',
};

// Intro 강조
const KBOFontBold = css`
  font-size: 42px;
  font-weight: 700;
  font-family: 'KBO-Dia-Gothic_bold';
`;
// Intro 인삿말
const KBOFontRegular = css`
  font-size: 30px;
  font-weight: 700;
  font-family: 'KBO-Dia-Gothic_bold';
`;

// 평상시 사용
const PretendardFont = css`
  font-size: 14px;
  font-weight: 500;
  font-family: 'Pretendard-Regular';
`;

const WH100 = css`
  width: 100%;
  height: 100%;
`;

const FlexCol = css`
  display: flex;
  flex-direction: column;
`;

const FlexRow = css`
  display: flex;
  flex-direction: row;
`;

const FlexCenter = css`
  justify-content: center;
  align-items: center;
`;

const BoxCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const theme = {
  colors,
  WH100,
  FlexCol,
  FlexRow,
  FlexCenter,
  BoxCenter,
  KBOFontBold,
  KBOFontRegular,
  PretendardFont,
};

export const Theme: DefaultTheme = {
  ...theme,
  bgColor: '#f1f3f5',
  bgColor2: '#dee2e6',
  color: '#191A23',
  color2: '#E5E5E5',
};
