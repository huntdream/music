import useSWR, { KeyedMutator } from 'swr';
import { IUser } from '../types/user';
import fetcher from '../utils/fetcher';
import { useUser } from '../context/App';

const useAccount = (): [IUser | undefined, KeyedMutator<IUser>] => {
  const [, setUser] = useUser();

  const { data, mutate } = useSWR<IUser>(
    `/user/account`,
    (url: string) =>
      fetcher<any, { profile: IUser }>(url, {
        params: {
          timestamp: new Date().getTime(),
        },
      }).then((res) => {
        setUser(res.profile);
        return res.profile;
      }),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  return [data, mutate];
};

export default useAccount;
