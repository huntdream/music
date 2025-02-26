import useSWR from 'swr';
import { IEvent, IEventData } from '../types/event';
import fetcher from '../utils/fetcher';

interface Params {
  lasttime?: number;
  pagesize?: number;
  limit?: number;
  id?: number;
}

const useEvents = ({ id, ...params }: Params) => {
  const { data, error } = useSWR(
    id ? `/user/event?uid=${id}` : '/event',
    (url: string) =>
      fetcher<any, any>(url, {
        params,
      }).then((event) => {
        const newEvents = event[id ? 'events' : 'event'].map((it: any) => {
          const json = JSON.parse(it.json);
          if (json.song) {
            json.song = {
              ...json.song,
              dt: json.song?.duration,
              al: json.song?.album,
              ar: json.song?.artists,
            };
          }

          return {
            ...it,
            json,
          };
        });

        return { ...event, events: newEvents } as IEventData;
      }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, error };
};

export default useEvents;
