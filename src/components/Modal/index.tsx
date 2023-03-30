import React, { ReactNode, MouseEvent } from 'react';
import cls from 'classnames';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ModalProps {
  visible?: boolean;
  className?: string;
  title?: ReactNode;
  children?: ReactNode;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  className,
  children,
}) => {
  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return visible
    ? createPortal(
        <div>
          <div className='fixed inset-0 z-40 select-none bg-slate-50/75'></div>
          <div className='fixed inset-0 z-50 overflow-auto' onClick={onClose}>
            <div className='flex flex-col items-stretch min-h-screen py-20 px-2'>
              <div className='flex justify-center items-start'>
                <div
                  className={cls(
                    'relative flex flex-col max-w-full bg-white rounded-lg w-96 pointer-events-auto shadow-sm',
                    className
                  )}
                  onClick={stopPropagation}
                >
                  <div className='h-14 flex items-center justify-center relative border-b border-b-slate-100 '>
                    <h2 className='text-lg capitalize'>{title}</h2>

                    <XMarkIcon
                      className='absolute right-4 h-7 w-7 flex p-1 items-center justify-center rounded-full cursor-pointer transition duration-500 hover:bg-slate-300/80 '
                      onClick={onClose}
                    />
                  </div>
                  <div className='flex-1'>{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.getElementById('root')!
      )
    : null;
};

export default Modal;
