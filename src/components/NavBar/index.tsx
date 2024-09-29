import React from 'react';
import Compass from '../../icons/Compass';
import Library from '../../icons/Library';
import Home from '../../icons/Home';
import NavIcon from './NavIcon';

interface Props {}

const NavBar: React.FC<Props> = () => {
  return (
    <div className='fixed left-0 right-0 bottom-0 bg-white h-16 z-50 border-t flex justify-center'>
      <div className='flex justify-between items-center px-8 w-full'>
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
