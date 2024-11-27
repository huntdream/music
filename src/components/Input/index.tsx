import React, { InputHTMLAttributes, ReactNode, useId } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
}

const Input: React.FC<Props> = ({ label, className, ...props }) => {
  const id = useId();

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        {label}
      </label>
      <div className='relative mt-2 rounded-md shadow-xs'>
        <input
          id={id}
          className='block w-full rounded-md border-0 py-1.5  px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
