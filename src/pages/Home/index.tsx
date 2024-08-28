import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Player from '../../components/Player';
import './style.scss';

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <div className='home'>
      <Header />
      <div className='home-content'>
        <Outlet />
      </div>
      <Player />
    </div>
  );
};

export default Home;
