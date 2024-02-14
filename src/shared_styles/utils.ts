import { DefaultTheme } from "styled-components/dist/types";

export type ThemeColors = keyof DefaultTheme['colors'];

export const applyColor = (color: ThemeColors) => (props: { theme: DefaultTheme }) => props.theme.colors[color];