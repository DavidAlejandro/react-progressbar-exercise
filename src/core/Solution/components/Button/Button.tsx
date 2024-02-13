import { PropsWithChildren, memo } from 'react';

import { ThemeColors } from '../../../../shared_styles/utils';
import { ButtonRoot } from './ButtonStyle';

interface Props extends PropsWithChildren {
  color: ThemeColors;
  disabled: boolean;
  onClick: () => void;
};

export const Button = memo(({ color, children, disabled, onClick }: Props) => {
  return (
    <ButtonRoot disabled={disabled} color={color} onClick={onClick}>
      {children}
    </ButtonRoot>
  );
});