import React from 'react';
import SearchBar from '../../components/SearchBar';
import DailySongs from './DailySongs';
import { useUser } from '../../context/App';
import Auth from '@/components/Auth';
import DailyList from './DailyList';

interface Props {}

const Main: React.FC<Props> = () => {
  const [user] = useUser();

  return (
    <div className='px-2 pb-36 h-full'>
      <SearchBar />
      {user?.userId && (
        <div className='flex gap-2 flex-wrap'>
          <DailySongs />
          <DailyList />
        </div>
      )}
      <Auth page />
    </div>
  );
};

export default Main;
