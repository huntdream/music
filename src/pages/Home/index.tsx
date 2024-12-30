import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Player from '../../components/Player';
import NavBar from '../../components/NavBar';
import { AppContext } from '../../context/App/App';
import Sider from '../../components/Sider';
import Title from '../../components/Title';

interface Props {}

const Home: React.FC<Props> = () => {
  const { isDesktop } = useContext(AppContext);

  return (
    <div>
      <Title />

      <div className='h-dvh overflow-hidden flex'>
        {isDesktop && <Sider />}
        <main className='overflow-auto flex-1'>
          <Outlet />
        </main>
      </div>
      <Player />
      {!isDesktop && <NavBar />}
    </div>
  );
};

export default Home;
