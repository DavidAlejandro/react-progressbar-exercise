import styled from "styled-components";
import { applyColor } from "../../shared_styles/utils";

export const ProgressBarContainer = styled.div`
  margin-bottom: 48px;
`;

export const BreakpointsLabel = styled.div <{ $hidden?: boolean }>`
  margin-bottom: 8px;
  font-size: 14px;
  color: ${applyColor("gray")};
  visibility: ${({ $hidden }) => ($hidden ? "hidden" : "visible")};
`;