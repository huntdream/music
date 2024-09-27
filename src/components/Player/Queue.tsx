import React, { ReactNode } from 'react';
import * as Popover from '@radix-ui/react-popover';
import Song from '../Song';
import './style.scss';
import usePlayer from './usePlayer';

interface Props {
  children: ReactNode;
}

const Queue: React.FC<Props> = ({ children }) => {
  const { queue } = usePlayer();

  return (
    <Popover.Root>
      <Popover.Trigger onClick={(e) => e.stopPropagation()}>
        <div>{children}</div>
      </Popover.Trigger>
      <Popover.Content className='player-popover mx-4 bg-white z-50 rounded-md shadow-md outline-none'>
        <div className='player-playlist'>
          {queue.map((track) => (
            <Song song={track} key={track.id} />
          ))}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};

export default Queue;
