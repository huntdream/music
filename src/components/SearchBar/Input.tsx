import React, {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import clsx from 'clsx';
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  keyword?: string;
  onPressEnter?: (value: string) => void;
}

const Input: React.FC<Props> = ({
  keyword,
  className,
  onPressEnter,
  onChange,
  value,
  ...props
}) => {
  const [val, setVal] = useState<string>('');

  useEffect(() => {
    setVal(value || '');
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      onPressEnter?.(val);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
    onChange?.(e);
  };

  return (
    <input
      placeholder='搜索'
      className={clsx(
        'flex h-8 w-full rounded-md border border-input outline-hidden px-3 py-2 text-sm',
        className
      )}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};

export default Input;
