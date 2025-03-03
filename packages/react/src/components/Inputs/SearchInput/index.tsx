import React, { InputHTMLAttributes, forwardRef, useState } from 'react';
import clsx from 'clsx';
import { Icon, icons } from '../../Icons';

interface IconProps {
  name?: keyof typeof icons;
  position?: 'left' | 'right';
}
interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  size?: 'xs' | 'lg';
  grow?: boolean;
  disabled?: boolean;
  withAsterisk?: boolean;
  required?: boolean;
  width?: string;
  error?: {
    description?: string;
  };
  iconProps?: IconProps;
}
const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      label,
      size = 'xs',
      grow = true,
      disabled = false,
      withAsterisk = false,
      required = false,
      width,
      error,
      iconProps,
      ...rest
    },
    ref,
  ) => {
    const [onFocus, setOnFocus] = useState(false);

    const inputAndIconWrapperClasses = clsx({
      [!disabled ? 'bg-white' : 'bg-neutral-100']: true,
      ['font-default font-regular leading-text placeholder:text-neutral-600']:
        true,
      [`rounded-search-input-${size}`]: true,
      ['inline-flex border ']: true,
      [error?.description
        ? 'border-error'
        : onFocus
          ? 'primary-border'
          : 'border-neutral-400 active:!border-neutral-400']: true,
    });

    const inputClasses = clsx({
      ['outline-none shadow-none justify-center text-sm disabled:text-neutral-600 items-center gap-2.5 inline-flex']:
        true,
      [`rounded-search-input-${size}`]: true,
      ['pl-3 py-2 h-[36px]']: size === 'xs',
      ['pl-4 py-3 h-[44px]']: size === 'lg',
      ['w-full']: grow,
      ['input:-webkit-autofill']: {
        '-webkit-text-fill-color': 'currentColor',
        '-webkit-box-shadow': '0 0 0px 1000px transparent inset',
        transition: 'background-color 5000s ease-in-out 0s',
      },
    });

    const wrapperClasses = clsx({
      ['flex flex-col gap-1 ']: true,
      ['w-full']: grow,
    });

    const labelClasses = clsx({
      ['font-default text-xs leading-text font-medium inline-flex gap-1 justify-start items-center align-middle']:
        true,
    });

    const errorLabelClasses = clsx({
      ['font-default leading-text font-regular text-error inline-flex justify-start items-center align-middle']:
        true,
      ['text-xs']: size === 'xs',
      ['text-sm']: size === 'lg',
    });

    const iconClasses = clsx({
      ['flex items-center px-3 focus:outline-none']: true,
    });

    return (
      <div className={wrapperClasses}>
        {label && (
          <label className={labelClasses}>
            {label}
            {(required || withAsterisk) && <p className="text-error">*</p>}
          </label>
        )}
        <div className={inputAndIconWrapperClasses}>
          {iconProps?.position === 'left' && (
            <div className={iconClasses}>
              <Icon
                name={iconProps?.name || 'search'}
                size={18}
                color={!disabled ? 'inherit' : 'text-neutral-600'}
              />
            </div>
          )}
          <input
            {...rest}
            ref={ref}
            type={'text'}
            className={inputClasses}
            onFocus={() => setOnFocus(true)}
            onBlur={() => setOnFocus(false)}
            required={required}
            disabled={disabled}
            style={width ? { width } : {}}
          />
          {(!iconProps || iconProps?.position === 'right') && (
            <div className={iconClasses}>
              <Icon
                name={iconProps?.name || 'search'}
                size={18}
                color={!disabled ? 'inherit' : 'text-neutral-600'}
              />
            </div>
          )}
        </div>
        {error?.description && (
          <label className={errorLabelClasses}>{error.description}</label>
        )}
      </div>
    );
  },
);
SearchInput.displayName = 'SearchInput';
export { SearchInput, SearchInputProps };
