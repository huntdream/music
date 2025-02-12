import Image from '@/components/Image';
import { IDailyListRecommendation } from '@/types/playlist';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import Card from './Card';

const DailyList = () => {
  const navigate = useNavigate();
  const { data } = useSWR<IDailyListRecommendation>('/recommend/resource');

  const handleNavigate = (id: number) => {
    navigate(`/playlist/${id}`);
  };

  return data?.recommend.map(({ id, creator, picUrl, name }) => (
    <Card
      name={name}
      onClick={() => handleNavigate(id)}
      picUrl={picUrl}
      key={id}
    />
  ));
};

export default DailyList;
