import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import cls from 'classnames';
import useSWR from 'swr';
import { IComments } from '../../types/comment';
import User from '../User';

interface Props {
  id: string;
}

const Comment: React.FC<Props> = ({ id }) => {
  const { data } = useSWR<IComments>(
    id ? `/comment/event?threadId=${id}` : null
  );

  return (
    <div className='p-3 bg-cyan-50'>
      <div className='divide-y'>
        {data?.comments.map((comment) => (
          <div className='p-3' key={comment.commentId}>
            <User user={comment.user} size='small' />
            <div>{comment.content}</div>
            <div className='flex justify-between items-center mt-1'>
              <div className='text-gray-600 text-sm'>{comment.timeStr}</div>
              <div className='flex items-center'>
                <HeartIcon
                  className={cls('h-4 w-4 cursor-pointer hover:scale-110', {
                    'fill-red-500': comment.liked,
                  })}
                />
                <ChatBubbleOvalLeftEllipsisIcon className='h-4 w-4 ml-2' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
