import { memo } from 'react';

import { Row } from '../Layout/Row/Row';
import { CheckBoxLabel } from './CheckboxStyle';

type Props = {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

export const CheckBox = memo(({ label, checked, disabled, onChange }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <CheckBoxLabel $disabled={disabled}>
      <Row $alignItems='center'>
        <input type="checkbox" checked={checked} disabled={disabled} onChange={handleChange} />
        <span>{label}</span>
      </Row>
    </CheckBoxLabel>

  );
});
