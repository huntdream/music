import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { usePlaylists } from '../../fetchers/playlist';
import { AppContext } from '../../context/App/App';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import { House, Radius, Rss } from 'lucide-react';

import clsx from 'clsx';
import usePlayer from '../Player/usePlayer';
import Playlist from './Playlist';
import Footer from './Footer';

interface Props {}

const Sider: React.FC<Props> = () => {
  const { user } = useContext(AppContext);
  const { pathname } = useLocation();
  const [mylist = [], subscribed = []] = usePlaylists(user?.userId);
  const { isShow } = usePlayer();

  const isActive = (path: string) => pathname === path;

  const menu = [
    {
      name: '推荐',
      path: '/',
      icon: <House />,
    },
    {
      name: '私人漫游',
      path: '/personal',
      icon: <Radius />,
    },
    {
      name: '动态',
      path: '/moments',
      icon: <Rss />,
    },
  ];

  return (
    <Sidebar
      className={clsx(
        'transition duration-400',
        isShow && 'h-[calc(100svh_-_80px)]'
      )}
    >
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>发现</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map(({ name, path, icon }) => (
                <SidebarMenuItem key={path}>
                  <SidebarMenuButton asChild isActive={isActive(path)}>
                    <NavLink to={path}>
                      {icon}
                      <span>{name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent className='px-2'>
        <Playlist title='我的音乐' list={mylist} />
        <Playlist title='我的收藏' list={subscribed} />
      </SidebarContent>
      <Footer />
    </Sidebar>
  );
};

export default Sider;
