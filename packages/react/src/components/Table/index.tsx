import React from 'react';
import clsx from 'clsx';
import { Text } from '../Typography/Text';
import { Icon } from '../Icons';
import { Pagination, PaginationProps } from './Pagination';
import { Loader } from '../Loader';

interface TableColumn<T> {
  index: keyof T;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (data: T) => React.ReactNode;
}

interface TableClassNames {
  wrapper?: string;
  tableWrapper?: string;
  table?: string;
  head?: string;
  headCell?: string;
  bodyRow?: string;
  bodyCell?: string;
  emptyState?: string;
  loadingState?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  emptyValues?: { icon?: React.ReactNode; title?: string; subTitle?: string };
  pagination?: PaginationProps;
  isLoading?: boolean;
  height?: string;
  minHeight?: string;
  classNames?: TableClassNames;
  paddingInline?: string | number;
}

const Table = <T,>({
  columns,
  data,
  emptyValues,
  pagination,
  isLoading = false,
  height,
  minHeight,
  classNames = {},
  paddingInline,
}: TableProps<T>) => {
  const wrapperClasses = clsx(
    'flex items-start z-0 justify-center flex-col w-full',
    classNames.wrapper,
  );
  const tableWrapperClasses = clsx(
    'w-full overflow-x-auto',
    classNames.tableWrapper,
  );
  const tableClasses = clsx('min-w-full table-fixed', classNames.table);
  const theadClasses = clsx(
    'text-xs font-default text-neutral-700 border-t border-b border-neutral-100 py-3 bg-white',
    'sticky top-[-1px] z-10 shadow-sm bg-white',
    classNames.head,
  );
  const theadThClasses = clsx(
    'py-3 font-default font-regular',
    classNames.headCell,
  );
  const tbodyTrClasses = clsx(
    'border-b border-neutral-100',
    classNames.bodyRow,
  );
  const tbodyTdClasses = clsx(
    'text-sm font-default font-regular text-neutral-700 py-5',
    classNames.bodyCell,
  );
  const noDataClasses = clsx(
    'w-full h-full flex flex-col items-center justify-center',
    classNames.emptyState,
  );
  const loadingClasses = clsx(
    'w-full h-full flex flex-col items-center justify-center',
    classNames.loadingState,
  );

  const generateCellStyle = (
    column: TableColumn<T>,
    index: number,
  ): React.CSSProperties => {
    const style: React.CSSProperties = {};
    const alignment = column.align || 'left';
    style.textAlign = alignment;
    style.paddingInline = 16;
    if (column.width) {
      style.width = column.width;
    }
    if (index === 0) {
      style.paddingLeft = paddingInline || 0;
    }
    if (index === columns.length - 1) {
      style.paddingRight = paddingInline || 0;
    }
    return style;
  };

  const isEmpty = data?.length <= 0;
  const isEmptyAndNotLoading = isEmpty && !isLoading;
  const shouldDisplayEmptyOrLoadingState = isEmptyAndNotLoading || isLoading;
  return (
    <div className={wrapperClasses} style={{ height: '100%' }}>
      <div className={tableWrapperClasses} style={{ height: '100%' }}>
        <div
          style={
            height || minHeight
              ? {
                  maxHeight: height,
                  minHeight: minHeight,
                  height: minHeight,
                  overflowY: shouldDisplayEmptyOrLoadingState
                    ? 'hidden'
                    : 'auto',
                }
              : { height: '100%' }
          }
        >
          <table className={tableClasses}>
            <thead>
              <tr className={theadClasses}>
                {columns.map((column, index) => (
                  <th
                    className={theadThClasses}
                    style={generateCellStyle(column, index)}
                    key={index}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={isLoading ? { display: 'none' } : {}}>
              {data.map((row, rowIndex) => (
                <tr className={tbodyTrClasses} key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td
                      className={tbodyTdClasses}
                      style={generateCellStyle(column, colIndex)}
                      key={String(rowIndex) + String(colIndex)}
                    >
                      {column.render ? column.render(row) : row[column.index]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {shouldDisplayEmptyOrLoadingState && (
            <div className="h-full flex flex-col items-center justify-center">
              {isLoading && (
                <div className={loadingClasses}>
                  <Loader size="xl" color="primary-border" />
                </div>
              )}
              {isEmpty && !isLoading && (
                <div className={noDataClasses}>
                  {emptyValues?.icon ?? (
                    <Icon size={48} color="primary-text" name="inbox-2" />
                  )}
                  <Text
                    color="text-neutral-800"
                    weight="regular"
                    size="lg"
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    {emptyValues?.title ?? 'There is no added items'}
                  </Text>
                  <Text
                    color="text-neutral-600"
                    weight="regular"
                    size="sm"
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    {emptyValues?.subTitle}
                  </Text>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {!isEmpty && !isLoading && pagination && (
        <div className="flex items-center justify-center w-full pt-4">
          <Pagination pagination={pagination} />
        </div>
      )}
    </div>
  );
};
Table.displayName = 'Table';
export { Table, TableProps, TableColumn };
