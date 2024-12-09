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
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
      }}
    >
      <AppProvider>
        <PlayerProvider>{children}</PlayerProvider>
      </AppProvider>
    </SWRConfig>
  );
};

export default Config;
