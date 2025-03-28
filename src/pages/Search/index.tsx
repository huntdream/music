import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import {
  ResultDataKey,
  ResultType,
  SEARCH_TYPE_LIST,
  SEARCH_TYPE_MAP,
  SearchResult,
} from '../../types/search';
import Empty from '../../components/Empty';
import Result, { ResultDataType } from './Result';
import Loading from '../../components/Loading';
import { IUser } from '../../types/user';
import { Input } from '@/components/ui/input';

interface Props {}

const Search: React.FC<Props> = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();

  const [searchType, setSearchType] = useState<ResultType>(
    (searchParams.get('type') || 'songs') as ResultType
  );
  const [keywords, setKeywords] = useState(searchParams.get('keyword') || '');

  const { data, isLoading } = useSWR<SearchResult>(
    keywords
      ? {
          url: `/cloudsearch`,
          params: {
            type: SEARCH_TYPE_MAP[searchType]?.code as any,
            keywords,
          },
        }
      : ''
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  };

  const handleTypeChange = (type: ResultType) => {
    setSearchType(type);
  };

  const renderData = useMemo(() => {
    if (!data?.result) return [];

    const key = SEARCH_TYPE_MAP[searchType].key as ResultDataKey;

    const picked = data.result[key] || [];
    return picked;
  }, [data]);

  return (
    <div>
      <div className='py-2 px-4 sticky z-30 top-0 bg-background/65 backdrop-blur-md'>
        <Input onChange={handleChange} value={keywords} ref={inputRef} />
        <div className='flex mt-3 overflow-hidden'>
          {SEARCH_TYPE_LIST.map((key) => (
            <div
              className={clsx(
                'px-4 mr-2 mb-2 cursor-pointer text-secondary-foreground whitespace-nowrap rounded-3xl hover:bg-secondary',
                {
                  'text-primary-foreground bg-secondary ': key === searchType,
                }
              )}
              key={key}
              onClick={() => handleTypeChange(key)}
            >
              {SEARCH_TYPE_MAP[key].name}
            </div>
          ))}
        </div>
      </div>
      <div className='mx-4'>
        {renderData.length ? (
          <div>
            {renderData.map((row: ResultDataType) => (
              <Result
                type={searchType}
                data={row}
                key={row.id || (row as IUser).userId}
              />
            ))}
          </div>
        ) : isLoading ? (
          <Loading />
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default Search;
