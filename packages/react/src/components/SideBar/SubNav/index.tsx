import React from 'react';
import { Text } from '../../Typography/Text';
import clsx from 'clsx';
import { NavLink, NavSubItem } from './NavLink';

interface NavItem {
  title: string;
  subItems: NavSubItem[];
  radius?: string;
}

interface SubNav extends NavItem {
  activeItem: string;
  isCollapsed: boolean;
  radius: string;
  paddingNavItem?: string | number;
}

export const SubNav = ({
  title,
  subItems,
  activeItem,
  isCollapsed,
  radius,
  paddingNavItem,
}: SubNav) => (
  <div className={clsx('flex flex-col gap-b-2')}>
    {!isCollapsed && (
      <Text size="xs" color="text-neutral-600" weight="regular">
        {title}
      </Text>
    )}
    {subItems.map((subItem, index) => (
      <NavLink
        radius={radius}
        key={index}
        subItem={subItem}
        activeItem={activeItem}
        isCollapsed={isCollapsed}
        paddingNavItem={paddingNavItem}
      />
    ))}
  </div>
);
