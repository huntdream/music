import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import cls from 'classnames';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  pirmary?: boolean;
}

const Button: React.FC<Props> = ({
  pirmary,
  className,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cls(
        'h-9 px-4 font-medium rounded-md',
        pirmary
          ? 'bg-black text-white hover:bg-slate-700 '
          : 'border border-slate-200 text-slate-900 hover:bg-slate-50'
      )}
    >
      {children}
    </button>
  );
};

export default Button;
