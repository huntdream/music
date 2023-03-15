import {
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import cls from 'classnames';
import { Button, Skeleton } from 'antd';
import React from 'react';
import useSWRInfinite from 'swr/infinite';
import User from '../User';
import { IComments } from '../../types/comment';

interface Props {}

const Comment: React.FC<Props> = () => {
  const { data, error, isValidating, mutate, size, setSize } =
    useSWRInfinite<IComments>((pageIndex, previousPageData) => {
      const url = `comment/new?type=0&id=28815381&sortType=3&pageSize=20&pageNo=${
        pageIndex + 1
      }`;

      if (pageIndex === 0) return url;

      const cursor = previousPageData?.comments?.pop()?.time;

      return `${url}&cursor=${cursor}`;
    });

  console.log(data, size);

  if (!data?.[0]) {
    return <Skeleton />;
  }

  return (
    <div>
      <div className='divide-y'>
        {data?.map((block) =>
          block.comments.map((comment) => (
            <div className='p-3'>
              <User user={comment.user} size='small' />
              <div className='whitespace-pre'>{comment.content}</div>
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
          ))
        )}
      </div>
      <Button
        onClick={() => {
          setSize(size + 1);
        }}
      >
        Load More
      </Button>
    </div>
  );
};

export default Comment;
