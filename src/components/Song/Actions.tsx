import React, { MouseEvent } from 'react';
import VerticalDots from '../../icons/VerticalDots';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MessageCircle } from 'lucide-react';
import { DropdownMenuPortal } from '@radix-ui/react-dropdown-menu';

interface Props {
  id: number;
}

const Actions: React.FC<Props> = ({ id }) => {
  const navigate = useNavigate();

  const navigateToComments = (e: MouseEvent) => {
    e.stopPropagation();
    navigate(`/comments/${id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <VerticalDots className='mx-2 cursor-pointer' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuItem>下一首播放</DropdownMenuItem> */}
        <DropdownMenuItem onClick={navigateToComments}>
          <MessageCircle />
          <span>评论</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
