import React from 'react';
import { SidebarFooter } from '../ui/sidebar';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import { Settings, SunMoon, Sun, Moon, LogOut } from 'lucide-react';
import { Theme, useTheme } from '../ThemeProvider';
import { Button } from '../ui/button';
import { useUser } from '@/context/App';
import fetcher from '@/utils/fetcher';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const [user] = useUser();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleSignout = () => {
    fetcher('/logout').then(() => {
      navigate('/');
      window.location.reload();
    });
  };

  return (
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
  );
};

export default Footer;
