import React, { useState, ReactNode } from 'react';
import clsx from 'clsx';
import { Text } from '../Typography/Text';
import { Icon } from '../Icons';
import { NavItem, NavSubItem } from './SubNav/NavLink';
import { SubNav } from './SubNav';

interface SideBarProps {
  activeItem: string;
  items: NavItem[];
  logo?: ReactNode;
  footer?: ReactNode;
  width?: string | number;
  padding?: string | number;
  buttonsRadius?: string;
  collapseText?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

const SideBar = ({
  logo,
  items,
  footer,
  activeItem,
  width = '250px',
  padding = '4px',
  buttonsRadius = '5px',
  isCollapsed: controlledCollapsed,
  collapseText,
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
        'h-full bg-white flex flex-col justify-between  transition-all delay-150 duration-300',
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
        <div className="flex justify-center items-center border-t-[0.5px] mt-4">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-transparent w-full "
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
                {collapseText && (
                  <Text
                    size="sm"
                    color="inherit"
                    weight="medium"
                    style={{
                      textAlign: 'center',
                      display: 'flex',
                      flexWrap: 'wrap',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {collapseText}
                  </Text>
                )}
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
