import React, { ChangeEvent, MouseEvent, ReactNode, useState } from 'react';
import useSWR from 'swr';
import { ResultType, SearchSuggest } from '../../types/search';
import { useNavigate } from 'react-router-dom';
import useClickAway from '../../hooks/useClickAway';
import Input from './Input';
import { Album, ListMusic, Music, User } from 'lucide-react';

interface Props {
  initialKeyword?: string;
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

const SearchBar: React.FC<Props> = ({ initialKeyword = '' }) => {
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

  const handleKeyUp = (value: string) => {
    navigate(`/search?keyword=${value}`);
  };

  const handleNavigate = (e: MouseEvent, type: string, name: string) => {
    e.stopPropagation();
    const searchParams = new URLSearchParams({
      keyword: name,
      type,
    });
    navigate({
      pathname: 'search',
      search: searchParams.toString(),
    });
  };

  return (
    <div>
      <div className='mx-4 py-2 sticky' ref={ref}>
        <Input
          placeholder='搜索'
          className='flex h-8 w-full rounded-md border border-input outline-hidden px-3 py-2 text-sm'
          value={keyword}
          onChange={handleChange}
          onFocus={handleFocus}
          onPressEnter={handleKeyUp}
        />
        {open && result && (
          <div className='absolute bg-white left-0 right-0 shadow-lg rounded-md p-2'>
            {result?.order ? (
              <div>
                <h2 className='font-bold'>猜你想搜</h2>
                {result?.order?.map((type) => (
                  <div key={type} className='first:mt-0 mt-2'>
                    <div className='text-secondary-foreground flex items-center mb-1 border-b'>
                      {RESULT_TYPE[type]}
                    </div>
                    <div className=''>
                      {result?.[type].map(({ name, id }) => (
                        <div
                          key={id}
                          className='hover:bg-secondary px-2 h-6 flex items-center rounded-s cursor-pointer'
                          onClick={(e) => handleNavigate(e, type, name)}
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
    </div>
  );
};

export default SearchBar;
