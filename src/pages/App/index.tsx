import { Route, Routes, useLocation } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import Home from '../Home';
import Config from '../Config';
import Library from '../Library';
import Playlist from '../../components/Playlist';
import Lyric from '../../components/Lyric';
import Moment from '../Moments';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };

  return (
    <Config>
      <Theme>
        <Routes location={state?.backgroundLocation || location}>
          <Route path='' element={<Home />}>
            <Route index path='me' element={<Library />} />
            <Route path='playlist/:id' element={<Playlist />} />
            <Route path='moments' element={<Moment />} />
            <Route path='lyric/:id' element={<Lyric />} />
          </Route>
        </Routes>

        <Toaster />
        {state?.backgroundLocation && (
          <Routes>
            <Route path='lyric/:id' element={<Lyric />} />
          </Routes>
        )}
      </Theme>
    </Config>
  );
}

export default App;
