import useSWR from 'swr';

const useLikeList = (id?: number): number[] => {
  const { data } = useSWR(id ? `/likelist?uid=${id}` : '');

  return data?.ids || [];
};

export default useLikeList;
