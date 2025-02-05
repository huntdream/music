import useSWR from 'swr';

const useFirstListen = (id: number) => {
  const { data } = useSWR(id ? `/music/first/listen/info?id=${id}` : null);

  return [data];
};

export default useFirstListen;
