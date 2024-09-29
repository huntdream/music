import React, { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cls from 'classnames';

interface Props {
  icon: (isActive: boolean) => ReactNode;
  path: string;
}

const NavIcon: React.FC<Props> = ({ path, icon }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = pathname === path;

  return (
    <div
      onClick={() => navigate(path)}
      className={cls('w-14 h-14 p-3 cursor-pointer rounded-md')}
    >
      {icon(isActive)}
    </div>
  );
};

export default NavIcon;
