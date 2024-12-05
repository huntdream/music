import React from 'react';
import VerticalDots from '../../icons/VerticalDots';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/Dropdown';

interface Props {
  id: number;
}

const Actions: React.FC<Props> = ({ id }) => {
  const navigate = useNavigate();

  const navigateToComments = () => {
    navigate(`/comments/${id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <VerticalDots className='mx-2 cursor-pointer' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuItem>下一首播放</DropdownMenuItem> */}
        <DropdownMenuItem onClick={navigateToComments}>评论</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
