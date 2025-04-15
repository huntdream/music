import React, { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from '../../context/App';
import PlayerProvider from '../Player/Provider';
import AIProvider from '../AI/Provider';

import fetcher from '../../utils/fetcher';
import { TooltipProvider } from '../ui/tooltip';

interface Props {
  children: ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <BrowserRouter>
      <SWRConfig
        value={{
          fetcher,
          revalidateOnFocus: false,
        }}
      >
        <AppProvider>
          <TooltipProvider delayDuration={200}>
            <AIProvider>
              <PlayerProvider>{children}</PlayerProvider>
            </AIProvider>
          </TooltipProvider>
        </AppProvider>
      </SWRConfig>
    </BrowserRouter>
  );
};

export default Providers;
