import React, { useCallback } from 'react';
import clsx from 'clsx';
import { Loader } from '../Loader';
import { Button } from '../Buttons/Button';
import { Icon, icons } from '../Icons';

interface DropzoneProps {
  onFileUpload: (file: File) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
  description?: string;
  acceptedFormats?: string;
  highlightText?: string;
  icon?: keyof typeof icons;
  isLoading?: boolean;
  loadingMessage?: string;
  hasError?: boolean;
  errorTitle?: string;
  errorMessage?: string;
}

const Dropzone: React.FC<DropzoneProps> = ({
  onFileUpload,
  accept = '.step,.stp,.stl',
  multiple = false,
  className,
  description = 'Arraste e solte o arquivo aqui ou',
  acceptedFormats = 'STEP, STP, STL',
  highlightText = 'clique para carregar',
  icon = 'upload-cloud-2-line',
  isLoading = false,
  loadingMessage = 'Processando...',
  hasError = false,
  errorTitle = 'Erro ao enviar arquivo',
  errorMessage = 'Clique no botão abaixo para tentar novamente ou arraste/clique aqui para enviar outro arquivo.',
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        onFileUpload(files[0]);
        if (fileInputRef.current) {
          fileInputRef.current.files = files;
        }
      }
    },
    [onFileUpload],
  );

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        onFileUpload(files[0]);
        if (fileInputRef.current) {
          fileInputRef.current.files = files;
        }
      }
    },
    [onFileUpload],
  );

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleRetry = () => {
    if (fileInputRef.current?.files) {
      onFileUpload(fileInputRef.current.files[0]);
    }
  };

  return (
    <div
      className={clsx(
        'border-2 border-dashed border-neutral-400 rounded-lg p-4 w-full h-48 flex items-center justify-center',
        className,
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={handleFileSelect}
        ref={fileInputRef}
        id="dropzone-input"
        disabled={isLoading}
      />
      {isLoading ? (
        <div className="flex flex-col items-center gap-2">
          <Loader color="primary-border" size="xl" />
          <h4>{loadingMessage}</h4>
        </div>
      ) : (
        <label
          htmlFor="dropzone-input"
          className="text-center text-neutral700 cursor-pointer"
        >
          {hasError ? (
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-red-500 font-bold">{errorTitle}</h3>
              <p className="text-red-500">{errorMessage}</p>
              <Button
                label="Enviar Novamente"
                onClick={handleRetry}
                size="sm"
              />
            </div>
          ) : (
            <>
              <div className="mb-2 flex justify-center">
                <Icon name={icon} />
              </div>

              <p className="text-neutral-600">
                {description}{' '}
                <span className="primary-text">{highlightText}</span>
              </p>

              <p className="text-sm text-neutral-600">
                Formatos aceitos: {acceptedFormats}
              </p>
            </>
          )}
        </label>
      )}
    </div>
  );
};

Dropzone.displayName = 'Dropzone';

export { Dropzone, DropzoneProps };
