import { IAlbum, IArtist, IPlaylist } from './playlist';
import { ISong } from './song';
import { IUser } from './user';

export const SEARCH_TYPE_MAP = {
  songs: {
    name: '歌曲',
    code: 1,
  },
  albums: {
    name: '专辑',
    code: 10,
  },
  artists: {
    name: '音乐人',
    code: 100,
  },
  playlists: {
    name: '歌单',
    code: 1000,
  },
  user: {
    name: '用户',
    code: 1002,
  },
  lyric: {
    name: '歌词',
    code: 1006,
    key: 'songs',
  },
};

export const SEARCH_TYPE_LIST = Object.keys(SEARCH_TYPE_MAP) as Array<
  keyof typeof SEARCH_TYPE_MAP
>;

export type ResultType =
  | 'songs'
  | 'albums'
  | 'artists'
  | 'playlists'
  | 'userprofiles'
  | 'lyric';

export interface SearchSuggestResult {
  name: string;
  id: number;
  artist: IArtist[];
  album: IAlbum;
}

export type SearchSuggest = {
  [key in ResultType]: SearchSuggestResult[];
} & {
  order: ResultType[];
};

export interface SearchResult {
  result: {
    songs: (ISong & { lyrics: string })[];
    songCount: number;
    albums: IAlbum[];
    albumCount: number;
    userprofiles: IUser[];
    userprofileCount: number;
    playlists: IPlaylist[];
    playlistsCount: number;
  };
}
