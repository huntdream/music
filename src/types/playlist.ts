import { ISong } from './song';
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
  tracks: ISong[];
}

export interface RecommendReason {
  songId: number;
  reason: string;
  reasonId: string;
}

export interface IRecommendation {
  data: {
    dailySongs: ISong[];
    recommendReasons: RecommendReason[];
  };
}

export interface IDailyListRecommendation {
  recommend: IDailyListRecommend[];
}

export interface IDailyListRecommend {
  id: number;
  type: number;
  name: string;
  copywriter: string;
  picUrl: string;
  playcount: number;
  createTime: number;
  creator: IUser;
  trackCount: number;
  userId: number;
  alg: string;
}
