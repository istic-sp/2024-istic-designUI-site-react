import React, { ReactElement } from 'react';
import { Text } from '../../../Typography/Text';
import clsx from 'clsx';
export interface NavSubItem {
  label: string;
  path: string;
  icon: ReactElement;
  notification?: number;
}
export interface NavItem {
  title: string;
  subItems: NavSubItem[];
  radius?: string;
  paddingNavItem?: string | number;
}
type SubNavProps = {
  subItem: NavSubItem;
  radius: string;
  activeItem: string;
  isCollapsed: boolean;
  paddingNavItem?: string | number;
};
export const NavLink = ({
  subItem,
  activeItem,
  isCollapsed,
  radius,
  paddingNavItem,
}: SubNavProps) => {
  const isActive = activeItem === subItem.path;
  const linkClasses = clsx(
    'flex w-full flex-row items-center gap-x-2',
    'transition-colors duration-150 ease-in-out',
    'hover:text-white hover:primary-bg',
    {
      'bg-transparent text-neutral-800': !isActive,
      'primary-bg text-white': isActive,
    },
  );

  return (
    <a
      className={linkClasses}
      href={subItem.path}
      style={{
        borderRadius: radius,
        padding: paddingNavItem,
      }}
    >
      <div
        className="flex w-full flex-row gap-x-2"
        style={{
          justifyContent: isCollapsed ? 'center' : 'flex-start',
        }}
      >
        {React.cloneElement(subItem.icon, { color: 'inherit' })}
        {!isCollapsed && (
          <Text
            size="sm"
            color="inherit"
            weight="regular"
            style={{
              textAlign: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              whiteSpace: 'nowrap',
            }}
          >
            {subItem.label}
          </Text>
        )}
      </div>
      {!!subItem.notification && !isCollapsed && (
        <div className="rounded-full bg-error flex items-center justify-center px-[5px]">
          <Text size="xs" color="text-white">
            {subItem.notification}
          </Text>
        </div>
      )}
    </a>
  );
};
