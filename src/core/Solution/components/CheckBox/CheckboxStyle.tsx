import styled from "styled-components";
import { applyColor } from "../../../../shared_styles/utils";

export const CheckBoxLabel = styled.label<{ $disabled?: boolean }>`
  color: ${applyColor("gray")};
  cursor: ${({ $disabled }) => ($disabled ? "initial" : "pointer")};

  &input {
    cursor: pointer;
  }

  ${({ $disabled }) => !!$disabled && `span {
    opacity: 0.4;
  }`}
`;