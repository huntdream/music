import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import Home from '../Home';
import Config from '../Config';
import Library from '../Library';
import Playlist from '../../components/Playlist';
import Lyric from '../../components/Lyric';
import Moment from '../Moments';
import { Toaster } from 'react-hot-toast';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        index: true,
        path: 'me',
        element: <Library />,
      },
      {
        path: 'playlist/:id',
        element: <Playlist />,
      },
      {
        path: 'lyric/:id',
        element: <Lyric />,
      },
      {
        path: 'moments',
        element: <Moment />,
      },
    ],
  },
]);

function App() {
  return (
    <Config>
      <Theme>
        <RouterProvider router={router} />
        <Toaster />
      </Theme>
    </Config>
  );
}

export default App;
