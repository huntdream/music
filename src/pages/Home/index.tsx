import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Player from '../../components/Player';
import NavBar from '../../components/NavBar';
import { AppContext } from '../../context/App/App';
import Sider from '../../components/Sider';
import Title from '../../components/Title';
import { SidebarProvider } from '@/components/ui/sidebar';
import Header from '../../components/Header';

interface HomeProps {
  className?: string;
}

const Home: React.FC<HomeProps> = ({ className }) => {
  const { isDesktop } = useContext(AppContext);

  return (
    <SidebarProvider>
      <div className='flex min-h-screen flex-col'>
        <Title />
        <div className='flex flex-1 overflow-hidden'>
          {isDesktop && <Sider />}
          <main className='flex-1 min-w-0 overflow-auto'>
            <Header />
            <div className='max-w-full'>
              <Outlet />
            </div>
          </main>
        </div>
        <Player />
        {!isDesktop && <NavBar />}
      </div>
    </SidebarProvider>
  );
};

export default Home;
