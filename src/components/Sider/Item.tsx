import { FC, MouseEvent, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
  active?: boolean;
}

const Item: FC<Props> = ({ children, active, onClick }) => {
  return (
    <div
      className={`px-3 h-9 rounded-md flex items-center cursor-pointer mb-2 hover:bg-slate-200 ${
        active && 'bg-slate-200'
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Item;
