import { IAlbum } from './album';
import { ISong } from './song';

export interface ExpertIdentify {
  expertIdentiyId: number;
  expertIdentiyName: string;
  expertIdentiyCount: number;
}

export interface ArtistDetail {
  videoCount: number;
  artist: {
    id: number;
    cover: string;
    avatar: string;
    name: string;
    transNames: string[];
    alias: string[];
    identities: string[];
    identifyTag: string | null;
    briefDesc: string;
    rank: number | null;
    albumSize: number;
    musicSize: number;
    mvSize: number;
  };
  blacklist: boolean;
  preferShow: number;
  showPriMsg: boolean;
  secondaryExpertIdentiy: ExpertIdentify[];
}

export interface ArtistSongs {
  hotSongs: ISong[];
}

export interface ArtistAlbums {
  hotAlbums: IAlbum[];
}

export interface IArtist {
  id: number;
  name: string;
  picUrl: string;
  followed: boolean;
}
