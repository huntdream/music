import React from 'react';
import useSWR from 'swr';
import useUser from '../../context/App/useUser';
import { IRecommendation } from '../../types/playlist';
import Skeleton from '../../components/Skeleton';
import Image from '../../components/Image';
import { useNavigate } from 'react-router-dom';

interface Props {}

const DailySongs: React.FC<Props> = () => {
  const [user] = useUser();
  const navigate = useNavigate();

  const { data, isLoading } = useSWR<IRecommendation>(
    user?.userId ? '/recommend/songs' : ''
  );

  const images = data?.data?.dailySongs?.map((song) => song.al.picUrl) || [];

  const handleNavigate = () => {
    navigate('/daily');
  };

  return (
    <div className='p-3 inline-flex gap-2 flex-col max-w-52 hover:bg-secondary rounded-md'>
      <div className='h-44 w-44'>
        {isLoading ? (
          <Skeleton />
        ) : (
          <div onClick={handleNavigate}>
            <Image src={images[0]} className='rounded-md cursor-pointer' />
          </div>
        )}
      </div>
      <div
        className='text-center text-secondary-foreground cursor-pointer'
        onClick={handleNavigate}
      >
        每日推荐
      </div>
    </div>
  );
};

export default DailySongs;
