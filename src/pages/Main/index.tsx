import React from 'react';
import SearchBar from '../../components/SearchBar';
import Recommendation from './Recommendation';
import { useUser } from '../../context/App';

interface Props {}

const Main: React.FC<Props> = () => {
  const [user] = useUser();

  return (
    <div className='px-2'>
      <SearchBar />
      <div className='flex gap-2'>{user?.userId && <Recommendation />}</div>
    </div>
  );
};

export default Main;
