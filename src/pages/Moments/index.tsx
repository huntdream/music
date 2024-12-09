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
    <div className='p-4 pb-36 max-w-full'>
      <Events />
    </div>
  );
};

export default Moment;
