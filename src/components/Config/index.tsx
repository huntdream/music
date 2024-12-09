import React, { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import AppProvider from '../../context/App';
import PlayerProvider from '../Player/Provider';

import fetcher from '../../utils/fetcher';

interface Props {
  children: ReactNode;
}

const Config: React.FC<Props> = ({ children }) => {
  return (
    <AppProvider>
      <SWRConfig
        value={{
          fetcher,
          revalidateOnFocus: false,
        }}
      >
        <PlayerProvider>{children}</PlayerProvider>
      </SWRConfig>
    </AppProvider>
  );
};

export default Config;
