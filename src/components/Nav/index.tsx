import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import SearchBar from '../SearchBar';

interface Props {}

const Nav: React.FC<Props> = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const showBackButton = !['/'].includes(pathname);

  const handleBack = () => {
    navigate(-1);
  };

  if ([''].includes(pathname)) {
    return null;
  }

  const showSearchBar = !['/search'].includes(pathname);

  return (
    <nav className='flex items-center justify-between h-14 p-2 backdrop-blur-md bg-background/60 sticky top-0 z-10 border-b'>
      <div className='flex items-center w-9'>
        {showBackButton && (
          <Button variant='ghost' size='icon' onClick={handleBack}>
            <ArrowLeft />
          </Button>
        )}
      </div>

      <div className='flex items-center space-x-4'>
        {showSearchBar && <SearchBar className='w-60' />}
      </div>
    </nav>
  );
};

export default Nav;
