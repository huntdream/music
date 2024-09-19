import React from 'react';
import Item from './Item';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header';

interface Props {}

const Sider: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => pathname === path;

  const menu = [
    {
      name: '推荐',
      path: '/',
    },
    {
      name: '私人漫游',
      path: '/enjoy',
    },
    {
      name: '动态',
      path: '/moments',
    },
  ];

  return (
    <div className='pb-36 pt-4 border-r w-56 '>
      <Header />
      <div className='py-4 px-2'>
        <div>
          {menu.map(({ path, name }) => (
            <Item
              key={path}
              active={isActive(path)}
              onClick={() => navigateTo(path)}
            >
              {name}
            </Item>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sider;
