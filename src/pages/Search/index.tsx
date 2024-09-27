import React, { ChangeEvent, useState } from 'react';
import cls from 'classnames';
import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import Input from '../../components/SearchBar/Input';
import Song from '../../components/Song';
import {
  SEARCH_TYPE_LIST,
  SEARCH_TYPE_MAP,
  SearchResult,
} from '../../types/search';
import fetcher from '../../utils/fetcher';
import User from '../../components/User';
import PlaylistRow from '../../components/Playlists/PlaylistRow';

interface Props {}

const Search: React.FC<Props> = () => {
  const [searchParams] = useSearchParams();

  const [searchType, setSearchType] = useState<string>(
    searchParams.get('type') || 'songs'
  );
  const [keywords, setKeywords] = useState(searchParams.get('keyword') || '');

  const { data } = useSWR<SearchResult>(
    keywords
      ? {
          url: `/cloudsearch`,
          params: {
            //@ts-ignore
            type: SEARCH_TYPE_MAP[searchType]?.code as any,
            keywords,
          },
        }
      : ''
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  };

  const handleTypeChange = (type: string) => {
    setSearchType(type);
  };

  return (
    <div className=''>
      <div className='py-2 px-4 sticky top-0 bg-white/65 backdrop-blur-md'>
        <Input onChange={handleChange} value={keywords} />
      </div>
      <div className='mx-4'>
        <h2 className='font-bold border-b my-2'>
          搜索结果
          <span className='text-secondary'>
            {data?.result.songCount
              ? `（${data?.result.songCount}条结果）`
              : ''}
          </span>
        </h2>
        <div className='flex'>
          {SEARCH_TYPE_LIST.map((key) => (
            <div
              className={cls(
                'px-4 mr-2 mb-2 cursor-pointer text-secondary rounded-3xl hover:bg-active',
                {
                  'text-primary bg-active ': key === searchType,
                }
              )}
              key={key}
              onClick={() => handleTypeChange(key)}
            >
              {SEARCH_TYPE_MAP[key].name}
            </div>
          ))}
        </div>
        <div>
          <div>
            {data?.result?.songs?.map((song) => (
              <Song song={song} key={song.id} />
            ))}
          </div>

          <div className=''>
            {data?.result?.userprofiles?.map((user) => (
              <User
                size='large'
                signature
                className=' hover:bg-active cursor-pointer px-2 rounded-md py-1'
                user={user}
                key={user.userId}
              />
            ))}
          </div>
          <div>
            {data?.result?.playlists?.map((playlist) => (
              <PlaylistRow data={playlist} key={playlist.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
