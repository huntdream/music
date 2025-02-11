import React, { useState } from 'react';
import { IEvent } from '../../types/event';
import Song from '../Song';
import clsx from 'clsx';
import Comment from '../Comment';
import User from '../User';
import Image from '../Image';
import Pictures from './Pictures';
import { Heart, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
  event: IEvent;
}

const Event: React.FC<Props> = ({ event }) => {
  const [showComment, setShowComment] = useState(false);

  return (
    <div className='mb-8'>
      <div>
        <User user={event.user} signature size='large' />
      </div>
      {event.json.msg && (
        <div className='whitespace-pre-line my-4 max-w-[720px]'>
          {event.json.msg}
        </div>
      )}
      {event.json.mv && (
        <Image className='w-40 max-w-xs' src={event.json.mv.imgurl} alt='' />
      )}
      {event.json.song && (
        <Song className='my-4 max-w-96' song={event.json.song} standalone />
      )}
      <Pictures pics={event.pics} />
      <div className='flex border-b mt-4'>
        <Button variant='ghost'>
          <Heart
            fill={event.info.liked ? 'red' : 'transparent'}
            stroke={event.info.liked ? 'red' : 'currentColor'}
          />
          {event.info.likedCount > 0 && (
            <span className='text-secondary-foreground'>
              {event.info.likedCount || ''}
            </span>
          )}
        </Button>
        <Button
          variant='ghost'
          onClick={() => {
            setShowComment(!showComment);
          }}
          size={event.info.commentCount ? 'default' : 'icon'}
        >
          <MessageCircle />
          {event.info.commentCount > 0 && (
            <span className='ml-1'>{event.info.commentCount || ''}</span>
          )}
        </Button>
      </div>
      {showComment && <Comment id={event.info.threadId} />}
    </div>
  );
};

export default Event;
