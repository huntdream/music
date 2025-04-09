import { useFollows, useUserDetail } from '@/fetchers/user';
import { useParams } from 'react-router-dom';
import Info from './Info';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Events from '@/components/Events';
import { useState } from 'react';
import { useUser } from '@/context/App';
import Playlists from '@/components/Playlists';

interface Props {}

const User: React.FC<Props> = () => {
  const { uid } = useParams<{ uid: string }>();
  const [user] = useUser();
  const id = uid || user?.userId;

  const [tab, setTab] = useState('playlist');

  const { data } = useUserDetail(id);
  const { data: follows } = useFollows(id);

  const handleTabChange = (value: string) => {
    setTab(value);
  };

  if (!data) {
    return (
      <div className='flex justify-center items-center h-full'>
        <div className='text-2xl'>Loading...</div>
      </div>
    );
  }

  const { profile } = data;

  return (
    <div className=''>
      <Info user={profile} />
      <div>
        <Tabs value={tab} onValueChange={handleTabChange}>
          <div className='p-2 sticky top-0 bg-background z-10 flex justify-center shadow-xs'>
            <TabsList className='w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto sticky top-0'>
              <TabsTrigger value='playlist'>歌单</TabsTrigger>
              <TabsTrigger value='event'>动态</TabsTrigger>
            </TabsList>
          </div>

          <div className='px-4 py-2'>
            <TabsContent value='playlist'>
              <Playlists id={id} />
            </TabsContent>
            <TabsContent value='event' className='py-2'>
              <Events id={id} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default User;
