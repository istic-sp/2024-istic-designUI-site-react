import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { Icon, icons } from '../../Icons';
import { Loader } from '../../Loader';

interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
  iconName?: keyof typeof icons;
}

interface SelectProps {
  id?: string;
  options: Option[];
  onSelect: (option?: { label: string; value: string | number }) => void;
  onType?: (value: string) => void;
  label?: string;
  grow?: boolean;
  withAsterisk?: boolean;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  error?: {
    description?: string;
  };
  rightSection?: React.ReactNode;
  searchable?: boolean;
  filterBySearchable?: boolean;
  clearable?: boolean;
  defaultValue?: number | string;
  isLoading?: boolean;
  pickerHeight?: string;
  size?: 'xs' | 'lg';
}

const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      id,
      label,
      grow = true,
      disabled = false,
      placeholder,
      options = [],
      rightSection,
      withAsterisk = false,
      required = false,
      searchable = false,
      filterBySearchable = true,
      clearable = false,
      onSelect,
      onType,
      error,
      defaultValue,
      isLoading,
      pickerHeight = '30dvh',
      size = 'xs',
      ...rest
    },
    ref,
  ) => {
    const optionsRef = useRef<HTMLDivElement>(null);
    const getDefaultLabel = (value: string | number | undefined) => {
      const selectedOption = options.find((option) => option.value === value);
      return selectedOption ? selectedOption.label : '';
    };

    const [searchQuery, setSearchQuery] = useState(
      getDefaultLabel(defaultValue),
    );
    const [showOptions, setShowOptions] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({
      top: 0,
      left: 0,
      width: 0,
    });
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node) &&
          optionsRef.current &&
          !optionsRef.current.contains(event.target as Node)
        ) {
          setShowOptions(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    useEffect(() => {
      setSearchQuery(getDefaultLabel(defaultValue));
    }, [defaultValue]);

    useEffect(() => {
      setSearchQuery(getDefaultLabel(defaultValue));
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onType?.(event.target.value);
      setSearchQuery(event.target.value);
    };

    const toggleOptions = () => {
      if (selectRef.current) {
        const rect = selectRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom,
          left: rect.left,
          width: rect.width,
        });
      }
      setShowOptions(!showOptions);
    };

    const clearSelect = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      event.stopPropagation();
      setSearchQuery('');
      if (onSelect) onSelect(undefined);
    };

    const handleOptionClick = (value: Option) => {
      setSearchQuery(value.label);
      if (onSelect) onSelect(value);
      setShowOptions(false);
    };

    const filteredOptions =
      searchable && filterBySearchable
        ? options.filter((option) =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : options;

    const wrapperClasses = clsx('relative flex flex-col gap-1', {
      'w-full': grow,
    });
    const labelClasses =
      'font-default text-xs leading-text font-medium inline-flex gap-1 justify-start items-center align-middle';
    const errorLabelClasses =
      'font-default text-sm leading-text font-regular text-error inline-flex justify-start items-center align-middle';
    const buttonClasses = clsx(
      'flex w-full p-2 gap-2 border border-neutral-100 justify-start items-center text-center h-auto box-border disabled:cursor-not-allowed outline-none',
      {
        [`rounded-input-${size}`]: true,
        ['font-default font-medium leading-text text-sm']: true,
        [`text-neutral-800 hover:enabled:text-brand-400 active:enabled:text-white disabled:text-neutral-400`]:
          true,
        [`border border-transparent bg-white hover:enabled:bg-brand-50 active:enabled:!bg-brand-600 disabled:bg-neutral-100`]:
          true,
      },
    );
    const inputWrapperClasses = clsx(
      'border outline-none shadow-none inline-flex',
      {
        [`rounded-input-${size}`]: true,
        'font-default font-regular text-neutral-800 leading-text placeholder:text-neutral-600':
          true,
        [error?.description
          ? 'border-error'
          : 'border-neutral-400 focus:primary-border']: true,
        'bg-neutral-100': disabled,
        'bg-white': !disabled,
        ['text-xs px-3 py-2 h-[36px]']: size === 'xs',
        ['text-sm px-4 py-3 h-[44px]']: size === 'lg',
      },
    );
    const inputClasses = clsx(
      'w-full outline-none border-transparent shadow-none gap-2.5 inline-flex',
      {
        [`rounded-input-${size}`]: true,
        'font-default font-regular text-neutral-800 leading-text placeholder:text-neutral-600':
          true,
        'bg-neutral-100': disabled,
        'bg-white': !disabled,
        'text-sm h-full': true,
      },
    );
    const rightSectionClasses = clsx(
      'flex items-center justify-center h-full pr-3',
    );
    const pickerClasses = clsx(
      'absolute mt-1 flex flex-col w-full top-full z-50',
    );
    const iconProps = { size: 18, color: 'primary-text' };

    return (
      <div id={id} ref={selectRef} className={wrapperClasses}>
        {label && (
          <label className={labelClasses}>
            {label}
            {(required || withAsterisk) && <p className="text-error">*</p>}
          </label>
        )}
        <div className={inputWrapperClasses}>
          <input
            {...rest}
            ref={ref}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClasses}
            readOnly={!searchable}
            onClick={toggleOptions}
          />
          <div
            className={rightSectionClasses}
            onClick={() => setShowOptions(!showOptions)}
          >
            {rightSection ? (
              rightSection
            ) : isLoading ? (
              <Loader size="xs" color="primary-border" width="slim" />
            ) : clearable && searchQuery.length ? (
              <button onClick={(e) => clearSelect(e)}>
                <Icon name={'close'} {...iconProps} />
              </button>
            ) : (
              <Icon name="arrow-down-s" {...iconProps} />
            )}
          </div>
        </div>
        {showOptions &&
          !isLoading &&
          filteredOptions.length > 0 &&
          createPortal(
            <div
              id={id + 'select-options'}
              ref={optionsRef}
              className={pickerClasses}
              style={{
                position: 'absolute',
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
                maxHeight: pickerHeight,
                overflowY: 'auto',
              }}
            >
              <ul
                className={`bg-white border p-2 list-none rounded-input-${size}`}
              >
                {filteredOptions.map((option, index) => (
                  <li key={option.value + String(index)}>
                    <button
                      className={buttonClasses}
                      disabled={option.disabled}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.iconName && (
                        <Icon name={option.iconName} color="inherit" />
                      )}
                      <div className="whitespace-nowrap overflow-hidden">
                        {option.label}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>,
            document.body,
          )}
        {error?.description && (
          <div className={errorLabelClasses}>{error.description}</div>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
export { Select, SelectProps, Option };
