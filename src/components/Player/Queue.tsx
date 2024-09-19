import React, { ReactNode } from 'react';
import usePlayer from '../../context/App/usePlayer';
import * as Popover from '@radix-ui/react-popover';
import Song from '../Song';
import './style.scss';

interface Props {
  children: ReactNode;
}

const Queue: React.FC<Props> = ({ children }) => {
  const { queue } = usePlayer();

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div>{children}</div>
      </Popover.Trigger>
      <Popover.Content className='player-popover mx-4 bg-white z-50 rounded-md shadow-md outline-none'>
        <div className='player-playlist'>
          {queue.map((track) => (
            <Song song={track} />
          ))}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};

export default Queue;
