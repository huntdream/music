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

  const handleSignout = async () => {
    try {
      await fetcher('/logout');
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const themeIcons = {
    system: <SunMoon className='w-4 h-4 stroke-current' />,
    light: <Sun className='w-4 h-4 stroke-current' />,
    dark: <Moon className='w-4 h-4 stroke-current' />,
  };

  return (
    <SidebarFooter className='flex flex-row items-center gap-2 p-2'>
      <Avatar className='h-8 w-8'>
        <AvatarImage
          src={user?.avatarUrl}
          alt={user?.nickname || 'User avatar'}
        />
        <AvatarFallback>
          {user?.nickname?.slice(0, 1).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <span className='text-sm truncate'>{user?.nickname}</span>

      {user?.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='ml-auto'>
              <Settings className='h-4 w-4' />
              <span className='sr-only'>Open settings menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='top' align='end' className='w-40'>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className='gap-2'>
                {themeIcons[theme]}
                <span>Theme</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={(value) => setTheme(value as Theme)}
                  >
                    <DropdownMenuRadioItem value='system'>
                      <SunMoon className='mr-2 h-4 w-4' />
                      <span>System</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='light'>
                      <Sun className='mr-2 h-4 w-4' />
                      <span>Light</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='dark'>
                      <Moon className='mr-2 h-4 w-4' />
                      <span>Dark</span>
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem onClick={handleSignout}>
              <LogOut className='mr-2 h-4 w-4' />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </SidebarFooter>
  );
};

export default Footer;
