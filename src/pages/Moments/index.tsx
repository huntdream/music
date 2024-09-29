import React from 'react';
import Events from '../../components/Events';
import Auth from '../../components/Auth';
import { useUser } from '../../context/App';

interface Props {}

const Moment: React.FC<Props> = () => {
  const [user] = useUser();

  if (!user?.userId) {
    return <Auth page />;
  }

  return (
    <div className='w-[720px] pt-4 max-w-full px-4 mx-auto'>
      <Events />
    </div>
  );
};

export default Moment;
