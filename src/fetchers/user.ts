import { IUserDetail } from '@/types/user';
import useSWR from 'swr';

export const useUserDetail = (uid?: string | number) => {
  return useSWR<IUserDetail>(uid ? `/user/detail?uid=${uid}` : null);
};

export const useFollows = (uid?: string | number) => {
  return useSWR(`/user/follows?uid=${uid}`);
};

export const useFollowed = (uid?: string | number) => {
  return useSWR(`/user/followeds?uid=${uid}`);
};
