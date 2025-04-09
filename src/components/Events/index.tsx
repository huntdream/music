import React from 'react';
import useEvents from '../../fetchers/useEvents';
import Event from '../Event';
import Loading from '../Loading';

interface Props {
  id?: string | number;
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
    <div>
      {data?.events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Events;
