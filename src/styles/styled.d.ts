import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    WH100: RuleSet<object>;
    FlexCol: RuleSet<object>;
    FlexRow: RuleSet<object>;
    FlexCenter: RuleSet<object>;
    BoxCenter: RuleSet<object>;
    KBOFontBold: RuleSet<object>;
    KBOFontRegular: RuleSet<object>;
    PretendardFont: RuleSet<object>;
    bgColor: string;
    bgColor2: string;
    color: string;
    color2: string;
    colors: {
      white: string;
      black: string;
      black2: string;
      red: string;
      blue: string;
      purple: string;
      pink: string;
      yellow: string;
      gray: string;
      greey: string;
      lightdark: string;
      lightgreey: string;
    };
  }
}
