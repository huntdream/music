import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import Providers from './components/Providers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Providers>
    <App />
  </Providers>
);
