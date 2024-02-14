import styled from "styled-components";

import { applyColor, ThemeColors } from "../../../../shared_styles/utils";

export const ButtonRoot = styled.button<{ color: ThemeColors }>`
  box-sizing: border-box;
  padding: 16px 20px;
  min-width: 171px;
  box-shadow: inset 0 0 0 1px ${({ color }) => applyColor(color)};
  border-radius: 25px;
  color: ${({ color }) => applyColor(color)};
  font-weight: 600;
  letter-spacing: 1.2px;

  &:hover {
    box-shadow: inset 0 0 0 2px ${({ color }) => applyColor(color)};
  }

  &:active {
    box-shadow: inset 0 0 0 3px ${({ color }) => applyColor(color)};
  }

  &:disabled {
    opacity: 0.4;
    box-shadow: inset 0 0 0 1px ${({ color }) => applyColor(color)};
    cursor: initial;
  }
`;