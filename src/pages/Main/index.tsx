import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Player from '../../components/Player';
import NavBar from '../../components/NavBar';
import { AppContext } from '../../context/App/App';
import Sider from '../../components/Sider';
import Title from '../../components/Title';
import { SidebarProvider } from '@/components/ui/sidebar';

interface Props {}

const Main: React.FC<Props> = () => {
  const { isDesktop } = useContext(AppContext);

  return (
    <SidebarProvider>
      <Title />

      {isDesktop && <Sider />}
      <main className='overflow-auto flex-1'>
        <Outlet />
      </main>
      <Player />
      {!isDesktop && <NavBar />}
    </SidebarProvider>
  );
};

export default Main;
