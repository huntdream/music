import React, { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

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
      className={clsx('w-12 h-12 p-2 m-1 cursor-pointer rounded-md')}
    >
      {icon(isActive)}
    </div>
  );
};

export default NavIcon;
