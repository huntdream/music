import { IUser } from './user';

export interface IPlaylistsItem {
  subscribed: boolean;
  creator: IUser;
  backgroundCoverId: number;
  backgroundCoverUrl: string;
  titleImage: number;
  titleImageUrl: string;
  englishTitle: string;
  opRecommend: boolean;
  subscribedCount: number;
  cloudTrackCount: number;
  userId: number;
  totalDuration: number;
  coverImgId: number;
  privacy: number;
  trackUpdateTime: number;
  trackCount: number;
  updateTime: number;
  commentThreadId: string;
  coverImgUrl: string;
  specialType: number;
  anonimous: boolean;
  createTime: number;
  highQuality: boolean;
  newImported: boolean;
  trackNumberUpdateTime: number;
  playCount: number;
  adType: number;
  description: string;
  tags: string[];
  ordered: boolean;
  status: number;
  name: string;
  id: number;
}

export interface IPlaylist extends IPlaylistsItem {
  tracks: ITrack[];
}

export interface ITrack {
  id: number;
  name: string;
  publishTime: number;
  dt: number;
  al: IAlbum;
  ar: IArtist[];
}

export interface IAlbum {
  id: string;
  name: string;
  picUrl: string;
}

export interface IArtist {
  id: number;
  name: string;
}
