import {
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { IEvent } from '../../types/event';
import Song from '../Song';
import cls from 'classnames';
import Comment from '../Comment';
import User from '../User';
import Image from '../Image';
import Pictures from './Pictures';

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
        <div className='flex w-20 justify-center items-center cursor-pointer h-8 hover:bg-active'>
          <HeartIcon
            className={cls('h-5 min-w-5 hover:scale-110', {
              'fill-red-500': event.info.liked,
            })}
          />
          <span className='ml-1'>{event.info.likedCount || ''}</span>
        </div>
        <div
          className='flex w-20 justify-center items-center cursor-pointer h-8 hover:bg-active'
          onClick={() => {
            setShowComment(!showComment);
          }}
        >
          <ChatBubbleOvalLeftEllipsisIcon className='h-5 min-w-5 hover:scale-110' />
          <span className='ml-1'>{event.info.commentCount || ''}</span>
        </div>
      </div>
      {showComment && <Comment id={event.info.threadId} />}
    </div>
  );
};

export default Event;
