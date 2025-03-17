import React from 'react';
import SearchBar from '../../components/SearchBar';
import DailySongs from './DailySongs';
import { useUser } from '../../context/App';
import Auth from '@/components/Auth';
import DailyList from './DailyList';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface Props {}

const Home: React.FC<Props> = () => {
  const [user] = useUser();

  return (
    <div className='px-2 pb-36 h-full'>
      <SearchBar />
      {user?.userId && (
        <ScrollArea className='pr-1'>
          <div className='flex w-max space-x-2 p-4'>
            <DailySongs />
            <DailyList />
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      )}
      <Auth page />
    </div>
  );
};

export default Home;
