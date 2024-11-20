import {
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import cls from 'classnames';
import React from 'react';
import useSWRInfinite from 'swr/infinite';
import User from '../User';
import { IComments } from '../../types/comment';
import Button from '../Button';
import Loading from '../Loading';
import fetcher from '../../utils/fetcher';
import { IResourceType, ResourceTypes } from '../../types';

interface Props {
  id: number | string;
  type?: IResourceType;
}

const Comment: React.FC<Props> = ({ type, id }) => {
  const typeCode = type ? ResourceTypes[type] : '';

  const { data, error, isValidating, mutate, isLoading, size, setSize } =
    useSWRInfinite<IComments>(
      (pageIndex, previousPageData: IComments) => {
        const url = `comment/new?type=${typeCode}&id=${id}&sortType=3&pageSize=20&pageNo=${
          pageIndex + 1
        }`;

        if (previousPageData && !previousPageData?.hasMore) return null;

        if (pageIndex === 0) return url;

        const cursor = previousPageData?.comments?.pop()?.time;

        return `${url}&cursor=${cursor}`;
      },
      (url) => {
        return fetcher(url).then((res) => res.data);
      }
    );

  if (!data?.[0]) {
    return <Loading />;
  }

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');

  return (
    <div>
      {data?.map((block, index) => (
        <div key={block.cursor}>
          {block.comments.map((comment) => (
            <div className='p-3' key={comment.commentId}>
              <User user={comment.user} size='small' />
              <div className='whitespace-pre-line mt-2'>{comment.content}</div>
              <div className='flex justify-between items-center mt-1'>
                <div className='text-secondary text-sm'>{comment.timeStr}</div>
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
          {block.hasMore && index === data.length - 1 && (
            <div className='flex justify-center'>
              <Button
                loading={isLoadingMore}
                onClick={() => {
                  setSize(size + 1);
                }}
              >
                加载更多
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comment;
