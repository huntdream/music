import React, {
  ChangeEvent,
  MouseEvent,
  ReactNode,
  KeyboardEvent,
  useState,
} from 'react';
import useSWR from 'swr';
import { ResultType, SearchSuggest } from '../../types/search';
import { useNavigate } from 'react-router-dom';
import useClickAway from '../../hooks/useClickAway';
import { Album, ListMusic, Music, User } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

interface Props {
  initialKeyword?: string;
  className?: string;
}

const RESULT_TYPE: Record<Partial<ResultType>, ReactNode> = {
  songs: (
    <>
      <Music className='h-4 w-4 mr-2'></Music>歌曲
    </>
  ),
  artists: (
    <>
      <User className='h-4 w-4 mr-2'></User>音乐人
    </>
  ),
  playlists: (
    <>
      <ListMusic className='h-4 w-4 mr-2'></ListMusic>歌单
    </>
  ),
  albums: (
    <>
      <Album className='h-4 w-4 mr-2'></Album>专辑
    </>
  ),
  userprofiles: undefined,
  lyric: undefined,
};

const SearchBar: React.FC<Props> = ({ initialKeyword = '', className }) => {
  const [keyword, setKeyword] = useState<string>(initialKeyword);
  const [open, setOpen] = useState(false);
  const ref = useClickAway<HTMLDivElement>(() => setOpen(false));
  const navigate = useNavigate();

  const { data } = useSWR<{ result: SearchSuggest }>(
    keyword ? `/search/suggest?keywords=${keyword}` : null
  );

  const result = data?.result;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleFocus = () => {
    setOpen(true);
  };

  const handleNavigate = (type: string, keyword: string) => {
    const searchParams = new URLSearchParams({
      keyword,
      type,
    });
    setKeyword('');
    setOpen(false);
    navigate({
      pathname: 'search',
      search: searchParams.toString(),
    });
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      handleNavigate('songs', keyword);
    }
  };

  const handleClick = (e: MouseEvent, type: string, name: string) => {
    e.stopPropagation();
    handleNavigate(type, name);
  };

  return (
    <div ref={ref} className={cn('relative', className)}>
      <Input
        placeholder='搜索'
        className='flex outline-hidden rounded-full'
        value={keyword}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyUp={handleKeyUp}
      />
      {open && result && (
        <div className='absolute bg-background left-0 right-0 shadow-lg rounded-md p-2 z-50'>
          {result?.order ? (
            <div>
              <h2 className='font-bold'>猜你想搜</h2>
              {result?.order?.map((type) => (
                <div key={type} className='first:mt-0 mt-2'>
                  <div className='text-muted-foreground flex items-center mb-1 border-b'>
                    {RESULT_TYPE[type]}
                  </div>
                  <div className=''>
                    {result?.[type].map(({ name, id }) => (
                      <div
                        key={id}
                        className='flex h-9 items-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer'
                        onClick={(e) => handleClick(e, type, name)}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center text-secondary-foreground'>
              暂无数据
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
