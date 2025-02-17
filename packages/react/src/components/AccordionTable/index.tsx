import React, { useState } from 'react';
import clsx from 'clsx';
import { Text } from '../Typography/Text';
import { Icon } from '../Icons';
import { Loader } from '../Loader';
import { Pagination, PaginationProps } from '../Table/Pagination';

interface TableColumn<T> {
  index: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (data: T) => React.ReactNode;
}

interface AccordionTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  emptyValues?: { icon?: React.ReactNode; title?: string; subTitle?: string };
  pagination?: PaginationProps;
  isLoading?: boolean;
  height?: string;
  minHeight?: string;
  renderExpandedContent: (row: T) => React.ReactNode;
}

const AccordionTable = <T,>({
  columns,
  data,
  emptyValues,
  pagination,
  isLoading = false,
  height,
  minHeight,
  renderExpandedContent,
}: AccordionTableProps<T>) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (index: number) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((i) => i !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  const wrapperClasses = clsx(
    'flex items-start z-0 justify-center flex-col w-full',
  );
  const tableWrapperClasses = clsx('w-full overflow-x-auto');
  const tableClasses = clsx('min-w-full table-fixed');
  const theadClasses = clsx(
    'text-xs font-default text-neutral-700 border-t border-b border-neutral-100 py-3 bg-white',
    'sticky top-[-1px] z-10 shadow-sm bg-white',
  );
  const theadThClasses = clsx('py-3 font-default font-regular');
  const tbodyTrClasses = clsx('border-b border-neutral-100 cursor-pointer');
  const tbodyTdClasses = clsx(
    'text-sm font-default font-regular text-neutral-700 py-2',
  );
  const noDataClasses = clsx(
    'w-full h-full flex flex-col items-center justify-center',
  );
  const loadingClasses = clsx(
    'w-full h-full flex flex-col items-center justify-center',
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
      style.paddingLeft = 0;
    }
    if (index === columns.length - 1) {
      style.paddingRight = 0;
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
              ? { maxHeight: height, minHeight: minHeight, height: minHeight }
              : { height: '100%' }
          }
        >
          <table className={tableClasses}>
            <thead>
              <tr className={theadClasses}>
                <th className={theadThClasses} style={{ width: '60px' }} />
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
                <React.Fragment key={rowIndex}>
                  <tr
                    className={clsx(tbodyTrClasses, {
                      'bg-neutral50': expandedRows.includes(rowIndex),
                    })}
                    onClick={() => toggleRow(rowIndex)}
                  >
                    <td>
                      <Icon
                        size={24}
                        name={
                          expandedRows.includes(rowIndex)
                            ? 'arrow-up-s'
                            : 'arrow-down-s'
                        }
                        color="text-neutral-700"
                      />
                    </td>
                    {columns.map((column, colIndex) => (
                      <td
                        className={tbodyTdClasses}
                        style={generateCellStyle(column, colIndex)}
                        key={String(rowIndex) + String(colIndex)}
                      >
                        {column.render
                          ? column.render(row)
                          : // @ts-ignore
                            row[column.index]}
                      </td>
                    ))}
                  </tr>
                  {expandedRows.includes(rowIndex) && (
                    <tr className={tbodyTrClasses}>
                      <td colSpan={columns.length + 1}>
                        <div className="bg-neutral50 rounded">
                          {renderExpandedContent(row)}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
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
                    style={{ textAlign: 'center' }}
                  >
                    {emptyValues?.title ?? 'There is no added items'}
                  </Text>
                  <Text
                    color="text-neutral-600"
                    weight="regular"
                    size="sm"
                    style={{ textAlign: 'center' }}
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

AccordionTable.displayName = 'AccordionTable';
export { AccordionTable, AccordionTableProps, TableColumn };
