import React from 'react';
import { ResultType } from '../../types/search';
import { ISong } from '../../types/song';
import { IAlbum, IArtist, IPlaylist } from '../../types/playlist';
import { IUser } from '../../types/user';
import Song from '../../components/Song';
import Artist from '../../components/Artist';
import User from '../../components/User';
import PlaylistRow from '../../components/Playlists/PlaylistRow';
import Album from '../../components/Album';

export type ResultDataType = ISong | IArtist | IUser | IPlaylist | IAlbum;

interface Props {
  type: ResultType;
  data: ResultDataType;
}

const Result: React.FC<Props> = ({ data, type }) => {
  const renderResult = () => {
    switch (type) {
      case 'songs':
        return <Song song={data as ISong} />;
      case 'albums':
        return <Album data={data as IAlbum} />;
      case 'artists':
        return <Artist data={data as IArtist} />;
      case 'playlists':
        return <PlaylistRow data={data as IPlaylist} />;
      case 'userprofiles':
        return (
          <User
            user={data as IUser}
            size='large'
            signature
            className=' hover:bg-secondary cursor-pointer px-2 rounded-md py-1'
          />
        );
      case 'lyric':
        return <Song song={data as ISong} />;
      default:
        return null;
    }
  };

  return renderResult();
};

export default Result;
