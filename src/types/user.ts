export interface IUser {
  nickname: string;
  avatarUrl: string;
  userId: number;
  signature: string;
  id: number;
  vipType: number;
  backgroundUrl: string;
  birthday: number;
  createTime: number;
  followMe: boolean;
  eventCount: 1553;
  expertTags: null;
  experts: {};
  followTime: null;
  followed: false;
  followeds: number;
  follows: number;
  gender: 1 | 2;
  inBlacklist: false;
  mutual: false;
  newFollows: number;
  playlistBeSubscribedCount: number;
  playlistCount: number;
  eventsCount: number;
}

export interface IUserDetail {
  createDays: number;
  listenSongs: number;
  level: number;
  profile: IUser;
}
