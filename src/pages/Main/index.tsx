import React from 'react';
import SearchBar from '../../components/SearchBar';
import Recommendation from './Recommendation';
import { useUser } from '../../context/App';
import Auth from '@/components/Auth';

interface Props {}

const Main: React.FC<Props> = () => {
  const [user] = useUser();

  return (
    <div className='px-2 pb-36 h-full'>
      <SearchBar />
      <div className='flex gap-2'>{user?.userId && <Recommendation />}</div>
      <Auth page />
    </div>
  );
};

export default Main;
