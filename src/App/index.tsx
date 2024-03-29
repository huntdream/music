import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Config from '../Config';
import Library from '../pages/Library';
import Playlist from '../components/Playlist';
import Lyric from '../components/Lyric';
import Moment from '../pages/Moments';

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
      <RouterProvider router={router} />
    </Config>
  );
}

export default App;
