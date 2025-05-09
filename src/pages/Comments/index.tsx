import React from 'react';
import { useParams } from 'react-router-dom';
import { useSongDetail } from '../../fetchers/song';
import Comment from '../../components/Comment';
import Image from '../../components/Image';
import Artists from '../../components/Artist/Artists';

interface Props {}

const Comments: React.FC<Props> = () => {
  const { id } = useParams();
  const [song] = useSongDetail(id);

  return (
    <div className='h-full overflow-auto'>
      <div className='px-4 pt-4 bg-background mb-1'>
        <div className='flex'>
          <Image
            src={`${song?.al.picUrl}?param=250y250`}
            className='w-28 h-28 rounded-sm'
          />
          <div className='ml-4 flex flex-col justify-end'>
            <div className='text-lg font-bold'>{song?.name}</div>
            <Artists artists={song?.ar} />
          </div>
        </div>
      </div>
      <Comment id={id!} type='song' infinite />
    </div>
  );
};

export default Comments;
