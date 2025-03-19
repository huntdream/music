import React, { useContext } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import usePlaylists from '../../fetchers/usePlaylists';
import { AppContext } from '../../context/App/App';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  ChevronDown,
  House,
  ListMusic,
  LogOut,
  Moon,
  Radius,
  Rss,
  Settings,
  Sun,
  SunMoon,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

import {
  DropdownMenuShortcut,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import fetcher from '@/utils/fetcher';
import clsx from 'clsx';
import usePlayer from '../Player/usePlayer';
import { Theme, useTheme } from '../ThemeProvider';

interface Props {}

const Sider: React.FC<Props> = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id = '' } = useParams();
  const [mylist] = usePlaylists(user?.userId);
  const playlistId = pathname.startsWith('/playlist') ? parseInt(id, 10) : 0;
  const { isShow } = usePlayer();
  const { setTheme, theme } = useTheme();

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

  const handleSignout = () => {
    fetcher('/logout').then(() => {
      navigate('/');
      window.location.reload();
    });
  };

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
        <Collapsible defaultOpen>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                我的音乐
                <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mylist?.map((list) => (
                    <SidebarMenuItem key={list.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={playlistId === list.id}
                      >
                        <NavLink to={`/playlist/${list.id}`}>
                          {list.coverImgUrl ? (
                            <Avatar className='w-6 h-6'>
                              <AvatarImage
                                src={`${list.coverImgUrl}?param=150y150`}
                              />
                            </Avatar>
                          ) : (
                            <ListMusic className='w-6 h-6 stroke-current' />
                          )}
                          <span>{list.name}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter className='flex flex-row items-center'>
        <Avatar>
          <AvatarImage src={user?.avatarUrl} />
          <AvatarFallback>
            {user?.nickname?.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {user?.nickname}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {user?.userId && (
              <Button variant='ghost' size='icon' className='ml-auto'>
                <Settings />
              </Button>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent side='top' align='end' className='w-40'>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className='gap-2'>
                {theme === 'system' ? (
                  <SunMoon className='w-4 h-4 stroke-current' />
                ) : theme === 'light' ? (
                  <Sun className='w-4 h-4 stroke-current' />
                ) : (
                  <Moon className='w-4 h-4 stroke-current' />
                )}
                <span>Theme</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={(value) => setTheme(value as Theme)}
                  >
                    <DropdownMenuRadioItem value='system'>
                      <SunMoon />
                      <span>System</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='light'>
                      <Sun />
                      <span>Light</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='dark'>
                      <Moon />
                      <span>Dark</span>
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem onClick={handleSignout}>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Sider;
