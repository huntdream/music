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
  Radius,
  Rss,
  Settings,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

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
      icon: <House />,
    },
    {
      name: '私人漫游',
      path: '/enjoy',
      icon: <Radius />,
    },
    {
      name: '动态',
      path: '/moments',
      icon: <Rss />,
    },
  ];

  return (
    <Sidebar className='pb-20'>
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
      <SidebarContent>
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
                          <ListMusic />
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
        <Settings className='ml-auto' />
      </SidebarFooter>
    </Sidebar>
  );
};

export default Sider;
