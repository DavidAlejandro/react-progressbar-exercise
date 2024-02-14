import { PropsWithChildren, memo } from 'react';

import { ThemeColors } from '../../../../shared_styles/utils';
import { ButtonRoot } from './ButtonStyle';

interface Props extends PropsWithChildren {
  color: ThemeColors;
  disabled: boolean;
  onClick: () => void;
};

//TODO: update font-family fo match the design: https://raw.githubusercontent.com/futurestay/frontend-challenges/master/src/docs/button.png
export const Button = memo(({ color, children, disabled, onClick }: Props) => {
  return (
    <ButtonRoot disabled={disabled} color={color} onClick={onClick}>
      {children}
    </ButtonRoot>
  );
});