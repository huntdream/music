import { IAlbum } from './album';
import { IArtist } from './artist';

export interface ISong {
  bMusic: any;
  id: number;
  name: string;
  publishTime: number;
  dt: number;
  al: IAlbum;
  ar: IArtist[];
  copyright: 0 | 1 | 2;
  fee: number;
  noCopyrightRcmd: any;
  duration: number;
  album: IAlbum;
  artists: IArtist[];
}

export interface ILyricItem {
  lyric: string;
  version: number;
}

export interface ILyric {
  klyric: ILyricItem;
  lrc: ILyricItem;
  tlyric: ILyricItem;
  ytlrc: ILyricItem;
  yrc: ILyricItem;
  needDesc: boolean;
}
