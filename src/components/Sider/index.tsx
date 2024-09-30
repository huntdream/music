import React, { useContext } from 'react';
import Item from './Item';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Auth from '../Auth';
import usePlaylists from '../../fetchers/usePlaylists';
import { AppContext } from '../../context/App/App';
import { PlaylistIcon } from '../../icons/Audio';

interface Props {}

const Sider: React.FC<Props> = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id = '' } = useParams();
  const [mylist] = usePlaylists(user?.userId);
  const playlistId = pathname.startsWith('/playlist') ? parseInt(id, 10) : 0;

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
    <div className='pt-4 border-r w-60 overflow-hidden h-full flex flex-col'>
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

      <h2 className='my-2 ml-4 font-bold text-lg border-b'>我的歌单</h2>
      <div className='overflow-auto flex-1 pb-24 px-2'>
        {mylist?.map(({ id, name }) => (
          <Item
            onClick={() => navigateTo(`/playlist/${id}`)}
            active={id === playlistId}
            key={id}
          >
            <PlaylistIcon className='h-4 w-4 mr-1' />
            <span
              className='flex-1 whitespace-nowrap text-ellipsis overflow-hidden'
              title={name}
            >
              {name}
            </span>
          </Item>
        ))}
      </div>
    </div>
  );
};

export default Sider;
