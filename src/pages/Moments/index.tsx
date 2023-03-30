import React from 'react';
import Events from '../../components/Events';
import './style.scss';

interface Props {}

const Moment: React.FC<Props> = () => {
  return (
    <div className='moment'>
      <Events />
    </div>
  );
};

export default Moment;
