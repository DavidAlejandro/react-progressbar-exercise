import styled from "styled-components";

import { applyColor } from "../../../../shared_styles/utils";
import { Row } from "../Layout/Row/Row";

export const ProgressBarRow = styled(Row) <{ $fadeOut?: boolean; $show: boolean }>`
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  ${({ $fadeOut, $show }) => $fadeOut && !$show && 'transition: opacity 3s ease-in-out;'}
`;

export const ProgressContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  width: 100%;
  height: 6px;
  z-index: 0; 
  border-radius: 6px;
  background-color: ${applyColor('light-orange')};
`;

const PROGRESS_TRANSITION_DURATION = 0.4;
export const Progress = styled.div<{ value: number; }>`
  height: 6px;
  background: linear-gradient(to right, ${applyColor('orange')} 30%, ${applyColor('dark-orange')}, ${applyColor('red')});
  border-radius: 6px;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  transform-origin: left;
  transition: transform ${PROGRESS_TRANSITION_DURATION}s linear;
  transform: translateX(${({ value = 0 }) => -(100 - value)}%);
`;

export const ProgressLabel = styled.span`
  min-width: 32px;
  font-size: 12px;
  color: ${applyColor('gray')};
`