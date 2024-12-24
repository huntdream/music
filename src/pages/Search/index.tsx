import React, { ChangeEvent, useMemo, useState } from 'react';
import cls from 'classnames';
import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import Input from '../../components/SearchBar/Input';
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

interface Props {}

const Search: React.FC<Props> = () => {
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
    <div className=''>
      <div className='py-2 px-4 sticky z-30 top-0 bg-white/65 backdrop-blur-md'>
        <Input onChange={handleChange} value={keywords} />
        <div className='flex mt-3 overflow-hidden'>
          {SEARCH_TYPE_LIST.map((key) => (
            <div
              className={cls(
                'px-4 mr-2 mb-2 cursor-pointer text-secondary whitespace-nowrap rounded-3xl hover:bg-active',
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
