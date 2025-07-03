import { ThemeToggle } from '../ThemeProvider/ThemeToggle';
import SearchBar from '../SearchBar';

const Header: React.FC = () => {
  return (
    <header className='flex items-center justify-between p-2 border-b bg-background sticky top-0 z-10'>
      <SearchBar className='min-w-60 ml-auto mr-4' />
      <ThemeToggle />
    </header>
  );
};

export default Header;
