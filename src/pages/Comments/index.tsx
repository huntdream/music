import React from 'react';
import { useParams } from 'react-router-dom';
import useSongDetail from '../../fetchers/useSongDetail';
import Comment from '../../components/Comment';
import Image from '../../components/Image';
import Artists from '../../components/Artist/Artists';

interface Props {}

const Comments: React.FC<Props> = () => {
  const { id } = useParams();
  const [song] = useSongDetail(id);

  return (
    <div>
      <div className='px-4 pt-4 bg-white'>
        <div className='flex'>
          <Image src={song?.al.picUrl} className='w-28 h-28 rounded-sm' />
          <div className='ml-4 flex flex-col justify-end'>
            <div className='text-lg font-bold'>{song?.name}</div>
            <Artists artists={song?.ar} />
          </div>
        </div>
        <div className='mt-2 border-b font-bold text-lg'>评论</div>
      </div>
      <div className='mt-1 px-1'>
        <Comment id={id!} type='song' />
      </div>
    </div>
  );
};

export default Comments;
