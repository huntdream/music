import React, { ComponentType, ReactNode } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { FixedSizeList, FixedSizeListProps } from 'react-window';
import Song from '../Song';
import usePlayer from './usePlayer';

const List = FixedSizeList as ComponentType<FixedSizeListProps>;

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
      <Popover.Content
        onClick={(e) => e.stopPropagation()}
        className='player-popover mx-4 bg-white z-50 rounded-md shadow-around outline-none'
      >
        <div className=''>
          <div className='px-4 py-2 border-b'>
            <h2 className='text-primary font-bold text-lg'>播放列表</h2>
          </div>
          <div className='py-2'>
            <List
              height={420}
              width={290}
              itemCount={queue.length}
              itemSize={64}
            >
              {({ index, style }) => (
                <div style={style}>
                  <Song
                    song={queue[index]}
                    key={queue[index].id}
                    className='mx-2'
                  />
                </div>
              )}
            </List>
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};

export default Queue;
