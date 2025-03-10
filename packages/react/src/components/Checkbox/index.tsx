import React from 'react';
import clsx from 'clsx';
import { Text } from '../Typography/Text';
import { Icon } from '../Icons';

interface CheckboxProps {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  disabled = false,
  onChange,
}) => {
  const checkboxClasses = clsx(
    'h-[16px] w-[16px] flex items-center justify-center rounded-[3px] border',
    {
      'bg-neutral-200 border-neutral-400': disabled,
      'primary-bg primary-border': checked && !disabled,
      'border-neutral-400': !checked && !disabled,
    },
  );
  return (
    <label className="inline-flex items-center gap-2">
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className={checkboxClasses}>
        {disabled ? (
          <Icon size={10} name={'substract'} color="text-neutral-400" />
        ) : (
          checked && <Icon size={10} name={'check'} color="text-white" />
        )}
      </span>
      <Text weight="medium" color="text-neutral-700" size="xs">
        {label}
      </Text>
    </label>
  );
};
Checkbox.displayName = 'Checkbox';
export { Checkbox, CheckboxProps };
