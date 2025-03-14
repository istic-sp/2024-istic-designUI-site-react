import React from 'react';
import clsx from 'clsx';

interface LoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  width?: 'slim' | 'bold';
}

const Loader = ({
  size = 'md',
  color = 'border-slate-100',
  width = 'bold',
}: LoaderProps) => {
  const loaderClasses = clsx({
    ['w-4 h-4']: size === 'xs',
    ['w-5 h-5']: size === 'sm',
    ['w-6 h-6']: size === 'md',
    ['w-7 h-7']: size === 'lg',
    ['w-8 h-8']: size === 'xl',

    ['overflow-hidden border-solid rounded-full border-b-transparent inline-block box-border animate-spin']:
      true,

    ['border-2']: width === 'slim',
    ['border-4']: width === 'bold',
    [color]: true,
  });

  return <span className={loaderClasses} />;
};

Loader.displayName = 'Loader';
export { Loader, LoaderProps };
