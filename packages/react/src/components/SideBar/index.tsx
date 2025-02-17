import React, { useState, ReactElement, ReactNode } from 'react';
import clsx from 'clsx';
import { Text } from '../Typography/Text';
import { Icon } from '../Icons';

interface NavSubItem {
  label: string;
  path: string;
  icon: ReactElement;
  notification?: number;
}

interface NavItem {
  title: string;
  subItems: NavSubItem[];
  radius?: string;
}

interface SubNav extends NavItem {
  activeItem: string;
  isCollapsed: boolean;
  radius: string;
}

interface SideBarProps {
  logo?: ReactNode;
  activeItem: string;
  items: NavItem[];
  footer?: ReactNode;
  width?: string | number;
  padding?: string | number;
  buttonsRadius?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

const SubNav = ({
  title,
  subItems,
  activeItem,
  isCollapsed,
  radius,
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
      />
    ))}
  </div>
);

const NavLink = ({
  subItem,
  activeItem,
  isCollapsed,
  radius,
}: {
  subItem: NavSubItem;
  activeItem: string;
  isCollapsed: boolean;
  radius: string;
}) => {
  const isActive = activeItem === subItem.path;
  const linkClasses = clsx(
    'flex w-full flex-row items-center gap-x-2 p-2',
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
          <Text size="sm" color="inherit" weight="regular">
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

const SideBar = ({
  logo,
  items,
  footer,
  activeItem,
  width = '250px',
  padding = '4px',
  buttonsRadius = '5px',
  isCollapsed: controlledCollapsed,
  onToggleCollapse,
}: SideBarProps): JSX.Element => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isControlled = controlledCollapsed !== undefined;
  const isCollapsed = isControlled ? controlledCollapsed : internalCollapsed;

  const toggleSidebar = () => {
    if (isControlled && onToggleCollapse) {
      onToggleCollapse(!controlledCollapsed);
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  };

  return (
    <div
      style={
        isCollapsed
          ? {
              padding,
              width: 60,
            }
          : {
              padding,
              width,
            }
      }
      className={clsx(
        'h-full bg-white flex flex-col justify-between transition-[width] duration-300',
      )}
    >
      <div>
        {logo && (
          <div className="flex justify-center items-center border-b-[0.5px] py-4 mb-4">
            {logo}
          </div>
        )}
        <nav className="flex flex-col gap-y-2">
          {items.map((item, index) => (
            <SubNav
              radius={buttonsRadius}
              key={index}
              {...item}
              activeItem={activeItem}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
      </div>
      <footer>
        {!isCollapsed && footer}
        <div className="flex justify-center items-center border-t-[0.5px] py-4 mt-4">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-transparent hover:text-white hover:primary-bg w-full "
            style={{
              borderRadius: buttonsRadius,
            }}
          >
            {isCollapsed ? (
              <div className="flex justify-center items-center gap-4 flex-row text-inherit">
                <Icon name="arrow-right-double" size={20} color="inherit" />
              </div>
            ) : (
              <div className="flex justify-center items-center gap-4 flex-row text-inherit">
                <Icon name="arrow-left-double" size={20} color="inherit" />
                <Text size="sm" color="inherit" weight="medium">
                  Recolher Menu
                </Text>
              </div>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};

SideBar.displayName = 'SideBar';

export { SideBar, SideBarProps, NavItem, NavSubItem };
