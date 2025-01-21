import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ActionIcon } from '../../Buttons/ActionIcon';
import { Text } from '../../Typography/Text';
import { Icon } from '../../Icons';

interface StyleProps {
  main?: React.CSSProperties;
  input?: React.CSSProperties;
  datePicker?: React.CSSProperties;
  label?: React.CSSProperties;
  errorLabel?: React.CSSProperties;
}

interface DateInputProps {
  label?: string;
  size?: 'xs' | 'lg';
  grow?: boolean;
  width?: string;
  error?: {
    description?: string;
  };
  selectedDate?: string;
  value?: string;
  defaultValue?: string;
  onDateChange?: (date?: string) => void;
  placeholder?: string;
  clearable?: boolean;
  withAsterisk?: boolean;
  required?: boolean;
  disabled?: boolean;
  style?: StyleProps;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  size = 'lg',
  grow = true,
  error,
  value,
  defaultValue,
  onDateChange,
  placeholder,
  clearable = false,
  required = false,
  withAsterisk = false,
  disabled = false,
  style,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const dateInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dateInputRef.current &&
        !dateInputRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleChange = (date?: Date) => {
    const formattedDate = date ? formatDate(date) : undefined;
    onDateChange?.(formattedDate);
    setShowDatePicker(false);
  };

  const handleDateClick = (date: number, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        date,
      );
      handleChange(newDate);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker((state) => !state);
  };

  const inputClasses = clsx(
    'border outline-none shadow-none flex justify-between items-center gap-2.5 cursor-pointer',
    {
      [`rounded-input-${size}`]: true,
      'font-default font-normal text-neutral-800 leading-5 placeholder-neutral-600':
        true,
      'border-error': !!error?.description,
      'border-neutral-400 focus:primary-border': !error?.description,
      'bg-white': !disabled,
      'bg-neutral-100': disabled,
      'text-xs p-2 h-[36px]': size === 'xs',
      'text-sm p-3 h-[44px]': size === 'lg',
      'w-full': grow,
    },
  );

  const wrapperClasses = clsx('flex flex-col gap-1', {
    'w-full': grow,
  });

  const labelClasses = clsx(
    'font-default text-xs leading-5 font-medium flex gap-1 justify-start items-center',
  );

  const errorLabelClasses = clsx(
    'font-default leading-5 font-normal text-error flex justify-start items-center',
    {
      'text-xs': size === 'xs',
      'text-sm': size === 'lg',
    },
  );

  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  const generateCalendar = () => {
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );

    const daysInMonth: { date: number; isCurrentMonth: boolean }[] = [];
    const prevMonthDays: { date: number; isCurrentMonth: boolean }[] = [];
    const nextMonthDays: { date: number; isCurrentMonth: boolean }[] = [];

    const prevMonthEnd = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0,
    );
    for (
      let i = prevMonthEnd.getDate() - startOfMonth.getDay() + 1;
      i <= prevMonthEnd.getDate();
      i++
    ) {
      prevMonthDays.push({ date: i, isCurrentMonth: false });
    }

    for (let i = 1; i <= endOfMonth.getDate(); i++) {
      daysInMonth.push({ date: i, isCurrentMonth: true });
    }

    const nextMonthStartDay = endOfMonth.getDay();
    for (let i = 1; i < 7 - nextMonthStartDay; i++) {
      nextMonthDays.push({ date: i, isCurrentMonth: false });
    }

    return [...prevMonthDays, ...daysInMonth, ...nextMonthDays];
  };

  const calendarDays = generateCalendar();

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const formatHeaderDate = (date: Date) => {
    return date
      .toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  const isSelectedDate = (date: number) => {
    const selected = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      date,
    );
    return formatDate(selected) === value;
  };

  return (
    <div className={wrapperClasses} style={style?.main}>
      {label && (
        <label className={labelClasses} style={style?.label}>
          {label}
          {(required || withAsterisk) && <span className="text-error">*</span>}
        </label>
      )}
      <div className="relative">
        <div
          className={inputClasses}
          onClick={toggleDatePicker}
          style={style?.input}
        >
          <Text
            size={size === 'xs' ? 'xs' : size === 'lg' ? 'sm' : 'sm'}
            color={
              value || defaultValue ? 'text-neutral-700' : 'text-neutral-600'
            }
          >
            {(value || defaultValue) ?? (placeholder || 'Selecione uma data')}
          </Text>
          {clearable && (value || defaultValue) ? (
            <div onClick={() => handleChange(undefined)}>
              <Icon name="close" color="primary-text" />
            </div>
          ) : (
            <Icon name="calendar" color="primary-text" />
          )}
        </div>
        {showDatePicker && (
          <div
            ref={dateInputRef}
            className="absolute z-30 bg-white border max-w-64 border-neutral-400 rounded-[5px] mt-1 p-4"
            style={style?.datePicker}
          >
            <div className="flex justify-between items-center mb-2">
              <ActionIcon
                type="button"
                onClick={handlePrevMonth}
                variant="subtle"
                iconName="arrow-left-s"
              />
              <Text size={size === 'xs' ? 'xs' : size === 'lg' ? 'sm' : 'sm'}>
                {formatHeaderDate(currentDate)}
              </Text>
              <ActionIcon
                type="button"
                onClick={handleNextMonth}
                variant="subtle"
                iconName="arrow-right-s"
              />
            </div>
            <div className="flex justify-around">
              {daysOfWeek.map((day, index) => (
                <Text
                  key={index}
                  size={size === 'xs' ? 'xs' : size === 'lg' ? 'sm' : 'sm'}
                  color="text-neutral-500"
                >
                  {day}
                </Text>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {calendarDays.map(({ date, isCurrentMonth }, index) => (
                <div
                  key={index}
                  onClick={() => handleDateClick(date, isCurrentMonth)}
                  className={`justify-center flex items-center font-default text-sm p-2 cursor-pointer ${
                    isCurrentMonth
                      ? 'text-neutral-800 hover:bg-blue-500 h-8 w-8 hover:text-white rounded-sm'
                      : 'text-neutral-400'
                  } ${isCurrentMonth && isSelectedDate(date) ? 'primary-bg text-white' : ''}`}
                >
                  {date}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {error?.description && (
        <span className={errorLabelClasses} style={style?.errorLabel}>
          {error.description}
        </span>
      )}
    </div>
  );
};

DateInput.displayName = 'DateInput';
export { DateInput, DateInputProps };
