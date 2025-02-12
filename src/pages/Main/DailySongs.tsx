import React from 'react';
import useSWR from 'swr';
import useUser from '../../context/App/useUser';
import { IRecommendation } from '../../types/playlist';
import Skeleton from '../../components/Skeleton';
import Image from '../../components/Image';
import { useNavigate } from 'react-router-dom';
import Card from './Card';

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

  return <Card name='每日推荐' picUrl={images[0]} onClick={handleNavigate} />;
};

export default DailySongs;
