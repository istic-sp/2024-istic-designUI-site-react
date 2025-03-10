import React, { type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  weight?: 'regular' | 'medium' | 'bold';
}

const Text = ({
  size = 'md',
  color = 'text-neutral-700',
  weight = 'regular',
  ...rest
}: TextProps): JSX.Element => {
  const textClasses = clsx({
    ['font-default leading-text']: true,
    ['text-xs']: size === 'xs',
    ['text-sm']: size === 'sm',
    ['text-md']: size === 'md',
    ['text-lg']: size === 'lg',
    ['text-xl']: size === 'xl',
    [color]: true,
    ['font-regular']: weight === 'regular',
    ['font-medium']: weight === 'medium',
    ['font-bold']: weight === 'bold',
  });

  return <p {...rest} className={textClasses} style={rest.style} />;
};
Text.displayName = 'Text';
export { Text, TextProps };
