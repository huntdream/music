import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../Home';
import Config from '../Config';
import Library from '../components/Library';
import Playlist from '../Playlist';
import Lyric from '../components/Lyric';

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
