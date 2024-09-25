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

interface Props {
  event: IEvent;
}

const Event: React.FC<Props> = ({ event }) => {
  const [showComment, setShowComment] = useState(false);

  return (
    <div className='mb-8'>
      <div>
        <User user={event.user} signature />
      </div>
      {event.json.msg && (
        <div className='whitespace-pre-line my-4'>{event.json.msg}</div>
      )}
      {event.json.mv && (
        <Image className='w-40 max-w-xs' src={event.json.mv.imgurl} alt='' />
      )}
      {event.json.song && <Song className='my-4' song={event.json.song} />}
      {event.pics?.length > 0 && (
        <div className='flex flex-wrap max-w-xs'>
          {event.pics.map((pic) => (
            <Image
              src={pic.originUrl}
              key={pic.originUrl}
              className='w-1/3 basis-1/3'
              alt=''
            />
          ))}
        </div>
      )}
      <div className='flex border-t mt-4'>
        <div className='flex flex-1 justify-center items-center h-8'>
          <HeartIcon
            className={cls('h-4 w-4 cursor-pointer hover:scale-110', {
              'fill-red-500': event.info.liked,
            })}
          />
          <span className='ml-1'>{event.info.likedCount || ''}</span>
        </div>
        <div className='border-l my-1' />
        <div
          className='flex flex-1 justify-center items-center cursor-pointer h-8 hover:bg-gray-50'
          onClick={() => {
            setShowComment(!showComment);
          }}
        >
          <ChatBubbleOvalLeftEllipsisIcon className='h-4 w-4 hover:scale-110' />
          <span className='ml-1'>{event.info.commentCount || ''}</span>
        </div>
      </div>
      {showComment && <Comment id={event.info.threadId} />}
    </div>
  );
};

export default Event;
