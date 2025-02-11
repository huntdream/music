import Image from '@/components/Image';
import { IDailyListRecommendation } from '@/types/playlist';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

const DailyList = () => {
  const navigate = useNavigate();
  const { data } = useSWR<IDailyListRecommendation>('/recommend/resource');

  const handleNavigate = (id: number) => {
    navigate(`/playlist/${id}`);
  };

  return data?.recommend.map(({ id, creator, picUrl, name }) => (
    <div
      className='p-3 inline-flex gap-2 flex-col max-w-52 hover:bg-secondary rounded-md'
      onClick={() => handleNavigate(id)}
      key={id}
    >
      <div className='h-44 w-44'>
        <div>
          <Image src={picUrl} className='rounded-md cursor-pointer' />
        </div>
      </div>
      <div className='text-center text-secondary-foreground cursor-pointer'>
        {name}
      </div>
    </div>
  ));
};

export default DailyList;
