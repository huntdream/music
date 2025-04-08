import Album from '@/components/Album';
import Song from '@/components/Song';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useArtistAlbums,
  useArtistDetail,
  useArtistSongs,
} from '@/fetchers/artist';
import { User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Props {}

const Artist: React.FC<Props> = () => {
  const { id } = useParams();

  const artist = useArtistDetail(id);
  const songs = useArtistSongs(id);
  const albums = useArtistAlbums(id);

  const [tab, setTab] = useState('song');

  const handleTabChange = (value: string) => {
    setTab(value);
  };

  const tabTypes = [
    {
      name: '单曲',
      value: 'song',
    },
    {
      name: '专辑',
      value: 'album',
    },
    {
      name: '简介',
      value: 'about',
    },
  ];

  return (
    <div className='p-4'>
      <div className='flex flex-col justify-center items-center mt-6'>
        <Avatar className='w-28 h-28'>
          <AvatarImage src={`${artist?.artist.avatar}?param=200y200`} />
          <AvatarFallback delayMs={600}>
            <User />
          </AvatarFallback>
        </Avatar>
        <div className='mt-4 flex flex-col justify-center align-center text-center'>
          <div className='text-3xl font-bold h-9'>{artist?.artist.name}</div>
          <div className='mt-2 h-6'>{artist?.artist.transNames.join('/')}</div>
        </div>
      </div>
      <div className='mt-4'>
        <Tabs value={tab} onValueChange={handleTabChange}>
          <TabsList className='w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto'>
            {tabTypes.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className='w-full'
              >
                {item.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value='song'>
            {songs?.map((song) => (
              <Song key={song.id} song={song} showCover={false} />
            ))}
          </TabsContent>
          <TabsContent value='album'>
            {albums?.map((album) => (
              <Album key={album.id} album={album} />
            ))}
          </TabsContent>
          <TabsContent value='about'>
            <div className='whitespace-pre-line text-primary w-full max-w-[48rem] p-4'>
              {artist?.artist.briefDesc || '暂无简介'}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Artist;
