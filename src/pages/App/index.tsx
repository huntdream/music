import { Route, Routes, useLocation } from 'react-router-dom';
import Main from '../Main';
import Playlist from '../../components/Playlist';
import Lyric from '../Lyric';
import Moment from '../Moments';
import { Toaster } from 'sonner';
import Search from '../Search';
import { useEffect } from 'react';
import Artist from '../Artist';
import Daily from '../Daily';
import Comments from '../Comments';
import { useAccount } from '../../fetchers/user';
import Personal from '../Personal';
import Playing from '../Playing';
import { ThemeProvider } from '@/components/ThemeProvider';
import Home from '../Home';
import User from '../User';

function App() {
  useAccount();
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    const setupThemeColor = (query: MediaQueryList | MediaQueryListEvent) => {
      const MetaThemeColor = {
        light: '#fff',
        dark: '#18191a',
      };

      const meta = document.querySelector('meta[name="theme-color"]');

      meta?.setAttribute(
        'content',
        MetaThemeColor[query.matches ? 'dark' : 'light']
      );
    };

    const query = window.matchMedia('(prefers-color-scheme: dark)');

    setupThemeColor(query);

    query.addEventListener('change', setupThemeColor);
  }, []);

  return (
    <ThemeProvider>
      <Routes location={state?.backgroundLocation || location}>
        <Route path='' element={<Main />}>
          <Route index path='/' element={<Home />} />
          <Route path='me' element={<User />} />
          <Route path='playlist/:id' element={<Playlist />} />
          <Route path='moments' element={<Moment />} />
          <Route path='search' element={<Search />} />
          <Route path='lyric/:id' element={<Lyric />} />
          <Route path='artist/:id' element={<Artist />} />
          <Route path='daily' element={<Daily />} />
          <Route path='personal' element={<Personal />} />
          <Route path='comments/:id' element={<Comments />} />
          <Route path='playing/:id' element={<Playing />} />
          <Route path='user/:uid' element={<User />} />
          <Route
            path='*'
            element={
              <div className='h-full w-full flex justify-center items-center'>
                Work in progress
              </div>
            }
          />
        </Route>
      </Routes>

      <Toaster
        position='top-center'
        className='flex justify-center'
        toastOptions={{
          style: {
            width: 'fit-content',
          },
        }}
      />
      {state?.backgroundLocation && (
        <Routes>
          <Route path='lyric/:id' element={<Lyric />} />
          <Route path='playing/:id' element={<Playing />} />
        </Routes>
      )}
    </ThemeProvider>
  );
}

export default App;
