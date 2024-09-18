import React, { ReactNode } from 'react';
import usePlayer from '../../context/App/usePlayer';
import { Popover } from '@radix-ui/themes';
import Song from '../Song';
import './style.scss';

interface Props {
  children: ReactNode;
}

const Queue: React.FC<Props> = ({ children }) => {
  const { queue, play } = usePlayer();

  return (
    <Popover.Root>
      <Popover.Trigger>
        <div>{children}</div>
      </Popover.Trigger>
      <Popover.Content className='player-popover'>
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
