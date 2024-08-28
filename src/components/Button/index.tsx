import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import cls from 'classnames';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  pirmary?: boolean;
  wide?: boolean;
}

const Button: React.FC<Props> = ({
  pirmary,
  className,
  children,
  wide,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cls(
        'h-9 px-4 font-medium rounded-md cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed',
        className,
        pirmary
          ? 'bg-black text-white hover:bg-slate-700 '
          : 'border border-slate-200 text-slate-900 hover:bg-slate-50',
        wide && 'w-full'
      )}
    >
      {children}
    </button>
  );
};

export default Button;
