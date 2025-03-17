import { ThemeToggle } from '../ThemeProvider/ThemeToggle';
import SearchBar from '../SearchBar';

const Header: React.FC = () => {
  return (
    <header className='flex items-center justify-between px-4 py-2 border-b bg-background sticky top-0 z-10'>
      <SearchBar />
      <ThemeToggle />
    </header>
  );
};

export default Header;
