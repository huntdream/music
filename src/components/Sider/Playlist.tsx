import { Avatar, AvatarImage } from '../ui/avatar';
import { ChevronDown, ListMusic } from 'lucide-react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '../ui/sidebar';
import { IPlaylistsItem } from '@/types/playlist';

interface Props {
  title: string;
  list: IPlaylistsItem[];
}

const Playlist: React.FC<Props> = ({ title, list = [] }) => {
  const { pathname } = useLocation();
  const { id = '' } = useParams();
  const playlistId = pathname.startsWith('/playlist') ? parseInt(id, 10) : 0;

  return (
    <Collapsible defaultOpen className='group/collapsible'>
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            {title}
            <ChevronDown className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180' />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {list?.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild isActive={playlistId === item.id}>
                    <NavLink to={`/playlist/${item.id}`}>
                      {item.coverImgUrl ? (
                        <Avatar className='w-6 h-6'>
                          <AvatarImage
                            src={`${item.coverImgUrl}?param=150y150`}
                          />
                        </Avatar>
                      ) : (
                        <ListMusic className='w-6 h-6 stroke-current' />
                      )}
                      <span>{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default Playlist;
