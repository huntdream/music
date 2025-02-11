import { useEffect, useRef, useState, FC } from 'react';
import useSWRInfinite from 'swr/infinite';
import User from '../User';
import { IComments } from '../../types/comment';
import { Button } from '@/components/ui/button';
import Loading from '../Loading';
import fetcher from '../../utils/fetcher';
import { IResourceType, ResourceTypes } from '../../types';
import { Heart, MessageCircle } from 'lucide-react';

interface Props {
  id: number | string;
  type?: IResourceType;
  infinite?: boolean;
}

const Comment: FC<Props> = ({ type, id, infinite }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const typeCode = type ? ResourceTypes[type] : '';
  const [loaded, setLoaded] = useState(false);

  const { data, isLoading, setSize } = useSWRInfinite<IComments>(
    (pageIndex, previousPageData: IComments) => {
      const url = `comment/new?type=${typeCode}&id=${id}&sortType=3&pageSize=20&pageNo=${
        pageIndex + 1
      }`;

      if (previousPageData && !previousPageData?.hasMore) return null;

      const cursor = previousPageData?.comments?.at(-1)?.time || '';

      return `${url}&cursor=${cursor}`;
    },
    (url) => {
      return fetcher(url).then((res) => res.data);
    }
  );

  useEffect(() => {
    if (data && data[0]) {
      setLoaded(true);
    }
  }, [data]);

  useEffect(() => {
    if (!infinite) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          setSize((s) => s + 1);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [infinite, setSize, bottomRef.current, loaded]);

  if (!data?.[0]) {
    return <Loading />;
  }

  const totalCount = data[0].totalCount;

  return (
    <div className='px-2'>
      <div className='mt-4 border-b font-bold text-lg'>
        评论（{totalCount}）
      </div>
      <div>
        {data?.map((block) => (
          <div key={block.cursor}>
            {block.comments.map((comment) => (
              <div className='p-3 border-b' key={comment.commentId}>
                <div className='flex items-center'>
                  <User user={comment.user} size='normal' />
                  <div className='text-secondary-foreground text-sm ml-auto'>
                    {comment.timeStr}
                  </div>
                </div>
                <div className='whitespace-pre-line mt-2 ml-10 text-gray-700'>
                  {comment.content}
                </div>
                <div className='flex justify-between items-center mt-4 ml-10'>
                  <div className='flex items-center'>
                    <Button variant='ghost'>
                      <Heart
                        fill={comment.liked ? 'red' : 'transparent'}
                        stroke={comment.liked ? 'red' : 'currentColor'}
                      />
                    </Button>
                    <Button variant='ghost'>
                      <MessageCircle />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div ref={bottomRef} className='h-2' />
      {isLoading && <Loading />}
    </div>
  );
};

export default Comment;
