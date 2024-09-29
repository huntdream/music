import React from 'react';
import SearchBar from '../../components/SearchBar';
import Recommendation from './Recommendation';

interface Props {}

const Main: React.FC<Props> = () => {
  return (
    <div className='px-2'>
      <SearchBar />
      <div className='flex gap-2'>
        <Recommendation />
      </div>
    </div>
  );
};

export default Main;
