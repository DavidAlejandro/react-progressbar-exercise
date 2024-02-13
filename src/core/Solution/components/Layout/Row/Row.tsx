import styled from "styled-components";

export const Row = styled.div<{ $gap?: number, $alignItems?: string }>`
  display: flex;
  align-items: ${({ $alignItems }) => $alignItems || 'flex-start'};
  gap: ${({ $gap }) => $gap}px;
`;