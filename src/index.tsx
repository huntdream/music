import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import { BrowserRouter } from 'react-router-dom';
import Config from './components/Config';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Config>
      <App />
    </Config>
  </BrowserRouter>
);
