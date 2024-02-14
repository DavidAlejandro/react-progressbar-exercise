import 'styled-components';
import theme from './theme.json';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof theme.colors;
  }
}