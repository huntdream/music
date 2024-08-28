import React, { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cls from 'classnames';
import './style.scss';

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
      className={cls('nav-link', isActive && 'active')}
    >
      {icon(isActive)}
    </div>
  );
};

export default NavIcon;
