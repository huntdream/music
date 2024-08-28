import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Player from '../../components/Player';
import './style.scss';
import NavBar from '../../components/NavBar';

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <div className='home'>
      <Header />
      <div className='home-content'>
        <Outlet />
      </div>
      <Player />
      <NavBar />
    </div>
  );
};

export default Home;
