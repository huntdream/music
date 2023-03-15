import React from 'react';
import useEvents from '../../fetchers/useEvents';
import Event from '../Event';
import './style.scss';

interface Props {
  id?: number;
}

const Events: React.FC<Props> = ({ id }) => {
  const { data } = useEvents({ id, limit: 10 });

  if (!data) {
    return <div>Loading...</div>;
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
