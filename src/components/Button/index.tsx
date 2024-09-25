import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import cls from 'classnames';
import Loading from '../Loading';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  pirmary?: boolean;
  wide?: boolean;
  loading?: boolean;
}

const Button: React.FC<Props> = ({
  pirmary,
  className,
  children,
  wide,
  disabled,
  loading,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={cls(
        'h-9 px-4 flex items-center whitespace-nowrap font-medium rounded-md cursor-pointer disabled:opacity-75',
        className,
        pirmary
          ? 'bg-black text-white hover:enabled:bg-slate-700'
          : 'border border-slate-200 text-primary hover:enabled:bg-slate-50',
        {
          'w-full': wide,
          'cursor-wait': loading,
          'cursor-default': disabled,
        }
      )}
    >
      {loading && <Loading className='mr-2' />}
      {children}
    </button>
  );
};

export default Button;
