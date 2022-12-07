import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      red: string;
      black: string;
      grey: string;
      gray: string;
      lightGrey: string;
      lightGray: string;
      offWhite: string;
      maxWidth: string;
      bs: string;
    };
  }
}
