import React, { ComponentType, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { FixedSizeList, FixedSizeListProps } from 'react-window';
import Song from '../Song';
import usePlayer from './usePlayer';
import { ListMusic } from 'lucide-react';
import IconButton from '../IconButton';

const List = FixedSizeList as ComponentType<FixedSizeListProps>;

interface Props {}

const Queue: React.FC<Props> = ({}) => {
  const { queue } = usePlayer();
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        onClick={(e) => e.stopPropagation()}
        className='outline-hidden'
      >
        <IconButton>
          <ListMusic />
        </IconButton>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={30}
          onClick={(e) => e.stopPropagation()}
          className='player-popover mx-4 bg-background z-50 rounded-md shadow-around outline-hidden'
        >
          <div className=''>
            <div className='px-4 py-2 border-b'>
              <h2 className='text-primary font-bold text-lg'>播放列表</h2>
            </div>
            <div className='py-2'>
              <List
                height={420}
                width={350}
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
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Queue;
