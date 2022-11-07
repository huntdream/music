import { ITrack } from './playlist';

export type ISong = ITrack;

export interface ILyricItem {
  lyric: string;
  version: number;
}

export interface ILyric {
  klyric: ILyricItem;
  lrc: ILyricItem;
  tlyric: ILyricItem;
  needDesc: boolean;
}
