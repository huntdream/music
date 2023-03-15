import React, { ReactNode, MouseEvent } from 'react';
import cls from 'classnames';
import './style.scss';
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
        <div className='lanting-modal'>
          <div className='lanting-modal-mask'></div>
          <div className='lanting-modal-wrapper' onClick={onClose}>
            <div className='lanting-modal-inner'>
              <div className='lanting-modal-main'>
                <div
                  className={cls('lanting-modal-body', className)}
                  onClick={stopPropagation}
                >
                  <div className='lanting-modal-header'>
                    <h2 className='lanting-modal-title'>{title}</h2>

                    <XMarkIcon
                      className='lanting-modal-close-icon'
                      onClick={onClose}
                    />
                  </div>
                  <div className='lanting-modal-content'>{children}</div>
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
