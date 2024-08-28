import React from 'react';
import { HomeIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.scss';
import Compass from '../../icons/Compass';
import Library from '../../icons/Library';
import Home from '../../icons/Home';
import cls from 'classnames';
import NavIcon from './NavIcon';

interface Props {}

const NavBar: React.FC<Props> = () => {
  return (
    <div className='navbar'>
      <div className='navbar-inner'>
        <NavIcon path='/' icon={(active) => <Home active={active} />} />
        <NavIcon path='/me' icon={(active) => <Library active={active} />} />
        <NavIcon
          path='/moments'
          icon={(active) => <Compass active={active} />}
        />
      </div>
    </div>
  );
};

export default NavBar;
