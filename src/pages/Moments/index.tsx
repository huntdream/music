import React, { useContext } from 'react';
import Events from '../../components/Events';
import Auth from '../../components/Auth';
import { useUser } from '../../context/App';
import { AppContext } from '../../context/App/App';

interface Props {}

const Moment: React.FC<Props> = () => {
  const [user] = useUser();
  const { isDesktop } = useContext(AppContext);

  if (!user?.userId && !isDesktop) {
    return <Auth className='h-full w-full flex justify-center items-center' />;
  }
  return (
    <div className='w-[720px] pt-4 max-w-full px-4 mx-auto'>
      <Events />
    </div>
  );
};

export default Moment;
