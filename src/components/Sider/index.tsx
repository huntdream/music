import React, { useContext } from 'react';
import Item from './Item';
import { useLocation, useNavigate } from 'react-router-dom';
import Auth from '../Auth';
import Playlists from '../Playlists';
import usePlaylists from '../../fetchers/usePlaylists';
import { AppContext } from '../../context/App/App';

interface Props {}

const Sider: React.FC<Props> = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mylist, subscribed] = usePlaylists(user?.userId);

  console.log(mylist, '??');
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
    <div className='pt-4 border-r w-56 overflow-hidden h-full flex flex-col'>
      <Auth className='pl-4' />

      <div className='py-4 px-2'>
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

      <h2 className='my-2 ml-4 font-bold text-lg sticky'>我的歌单</h2>
      <div className='overflow-auto flex-1 pb-20 px-2'>
        <Playlists list={mylist} cover={false} divide={false} />
      </div>
    </div>
  );
};

export default Sider;
