import { useUser } from '@/context/App';
import { IUser, IUserDetail } from '@/types/user';
import fetcher from '@/utils/fetcher';
import useSWR, { KeyedMutator } from 'swr';

export const useUserDetail = (uid?: string | number) => {
  return useSWR<IUserDetail>(uid ? `/user/detail?uid=${uid}` : null);
};

export const useFollows = (uid?: string | number) => {
  return useSWR(`/user/follows?uid=${uid}`);
};

export const useFollowed = (uid?: string | number) => {
  return useSWR(`/user/followeds?uid=${uid}`);
};

export const useAccount = (): [IUser | undefined, KeyedMutator<IUser>] => {
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

export const useLikeList = (id?: number): number[] => {
  const { data } = useSWR(id ? `/likelist?uid=${id}` : '');

  return data?.ids || [];
};
