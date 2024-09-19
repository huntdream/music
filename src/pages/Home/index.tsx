import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Player from '../../components/Player';
import NavBar from '../../components/NavBar';
import { AppContext } from '../../context/App/App';
import Sider from '../../components/Sider';

interface Props {}

const Home: React.FC<Props> = () => {
  const { isDesktop } = useContext(AppContext);

  return (
    <div>
      {/* <Header /> */}
      <div className='h-dvh overflow-hidden flex'>
        {isDesktop && <Sider />}
        <main className='p-4 pb-36 overflow-auto flex-1'>
          <Outlet />
        </main>
      </div>
      <Player />
      {!isDesktop && <NavBar />}
    </div>
  );
};

export default Home;
