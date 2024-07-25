import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { Icon, icons } from '../Icons';
import clsx from 'clsx';

interface DropdownMenuItem {
  label: string;
  iconName: keyof typeof icons;
  onClick: () => void;
  disabled?: boolean;
  id: string;
}

interface DropdownMenuProps {
  mainItem: ReactElement<{ onClick: () => void }>;
  items: DropdownMenuItem[];
  position?: 'left' | 'right';
  align?: 'top' | 'bottom' | 'center';
}

const DropdownMenu = ({
  mainItem,
  items = [],
  position = 'left',
  align = 'center',
}: DropdownMenuProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const buttonClasses = clsx(
    'flex w-full p-2 gap-2 rounded-[5px] border border-neutral100 justify-start items-center text-center h-auto box-border disabled:cursor-not-allowed outline-none font-default font-medium leading-text text-sm',
    {
      'text-neutral800 hover:enabled:text-brand400 active:enabled:text-white disabled:text-neutral400':
        true,
      'border border-transparent bg-white hover:enabled:bg-brand0 active:enabled:!bg-brand600 disabled:bg-neutral100':
        true,
    },
  );

  const renderDropdownItems = () => {
    return (
      <ul className="bg-white border border-neutral400 p-2 mr-1 rounded-[5px] w-auto list-none">
        {items.map((item, index) => (
          <li key={item.iconName + index}>
            <button
              type="button"
              className={buttonClasses}
              disabled={item.disabled}
              onClick={item.onClick}
              id={item.id}
            >
              <Icon name={item.iconName} color="inherit" />
              <div className="whitespace-nowrap overflow-hidden">
                {item.label}
              </div>
            </button>
          </li>
        ))}
      </ul>
    );
  };

  const positionClasses = clsx({
    ['right-full']: position === 'left',
    ['left-full ml-1']: position === 'right',
    ['top-1/2 -translate-y-1/2']: align === 'center',
    ['bottom-0']: align === 'top',
    ['top-0']: align === 'bottom',
  });

  return (
    <div className="relative">
      <div
        ref={dropdownRef}
        className={`absolute z-30 ${positionClasses} transform `}
        style={{ width: 150 }}
      >
        {isOpen && renderDropdownItems()}
      </div>
      <div>{React.cloneElement(mainItem, { onClick: toggleDropdown })}</div>
    </div>
  );
};
DropdownMenu.displayName = 'DropdownMenu';

export { DropdownMenu, DropdownMenuProps };
