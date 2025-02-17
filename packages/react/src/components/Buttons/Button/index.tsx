import React, { type ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { Icon, icons } from '../../Icons';
import { Loader } from '../../Loader';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: 'filled' | 'outline' | 'subtle' | 'light';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  iconProps?: { iconName: keyof typeof icons; iconPosition: 'right' | 'left' };
  isLoading?: boolean;
  grow?: boolean;
}

const Button = ({
  label,
  variant = 'filled',
  size = 'md',
  grow = false,
  disabled = false,
  isLoading = false,
  iconProps,
  ...rest
}: ButtonProps): JSX.Element => {
  const gapClasses = clsx({
    ['gap-1']: size === 'xs',
    ['gap-2']: size === 'sm' || size === 'md' || size === 'lg' || size === 'xl',
  });

  const buttonClasses = clsx({
    ['flex justify-center items-center text-center h-auto']: true,
    ['box-border']: true,
    ['disabled:cursor-not-allowed outline-none']: true,
    ['relative']: true,
    ['overflow-hidden']: true,
    ['border border-transparent']: variant === 'filled' || variant === 'subtle',
    ['border']: variant === 'outline',

    [`btn-${variant}`]: true,
    [`btn-${size}`]: true,
    [`rounded-button-${size}`]: true,
    'btn-grow': grow,
    'disabled:cursor-not-allowed': true,
    ['px-3 py-2']: size === 'xs' || size === 'sm',
    ['px-6 py-4']: size === 'md' || size === 'lg' || size === 'xl',
    [gapClasses]: true,

    ['w-full']: grow,
  });

  const iconValues = {
    color: 'inherit',
    size:
      size === 'xs'
        ? 18
        : size === 'sm' || size === 'md'
          ? 20
          : size === 'lg'
            ? 24
            : 32,
  };

  return (
    <button
      {...rest}
      className={buttonClasses}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          <div className="animate-fadeInUp flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loader
              color={
                variant === 'filled'
                  ? 'white'
                  : variant === 'light'
                    ? 'primary-border'
                    : variant === 'outline'
                      ? 'primary-border'
                      : 'primary-border'
              }
              size={size}
            />
          </div>
          <div
            className={`animate-fadeOutUp transition-transform flex items-center justify-center opacity-0 ${gapClasses}`}
          >
            {iconProps && iconProps.iconPosition === 'left' && (
              <Icon name={iconProps.iconName} {...iconValues} />
            )}
            <div className="animate-fadeOutUp transition-transform whitespace-nowrap overflow-hidden">
              {label}
            </div>
            {iconProps && iconProps.iconPosition === 'right' && (
              <Icon name={iconProps.iconName} {...iconValues} />
            )}
          </div>
        </>
      ) : (
        <div
          className={`transition-transform flex items-center justify-center ${gapClasses}`}
        >
          {iconProps && iconProps.iconPosition === 'left' && (
            <Icon name={iconProps.iconName} {...iconValues} />
          )}
          <div className="whitespace-nowrap overflow-hidden">{label}</div>
          {iconProps && iconProps.iconPosition === 'right' && (
            <Icon name={iconProps.iconName} {...iconValues} />
          )}
        </div>
      )}
    </button>
  );
};

Button.displayName = 'Button';
export { Button, ButtonProps };
