import React, { use } from 'react';
import { Outlet } from 'react-router-dom';
import Player from '../../components/Player';
import NavBar from '../../components/NavBar';
import { AppContext } from '../../context/App/App';
import Sider from '../../components/Sider';
import Title from '../../components/Title';
import { SidebarProvider } from '@/components/ui/sidebar';
import usePlayer from '@/components/Player/usePlayer';
import clsx from 'clsx';

interface Props {}

const Main: React.FC<Props> = () => {
  const { isDesktop } = use(AppContext);
  const { isShow } = usePlayer();

  return (
    <SidebarProvider>
      <Title />

      {isDesktop && <Sider />}
      <main className={clsx('flex-1 min-w-0', isShow && 'pb-30')}>
        <Outlet />
      </main>
      <Player />
      {!isDesktop && <NavBar />}
    </SidebarProvider>
  );
};

export default Main;
