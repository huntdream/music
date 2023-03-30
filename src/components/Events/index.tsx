import React from 'react';
import useEvents from '../../fetchers/useEvents';
import Event from '../Event';
import Loading from '../Loading';
import './style.scss';

interface Props {
  id?: number;
}

const Events: React.FC<Props> = ({ id }) => {
  const { data, error } = useEvents({ id, limit: 10 });

  if (error) {
    return <div>Someting went wrong</div>;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div className='events'>
      {data?.events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Events;
