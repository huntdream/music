import { IPLocation } from '.';
import { IArtist } from './playlist';
import { ISong } from './song';
import { IUser } from './user';

export interface IPic {
  height: number;
  originUrl: string;
  squareUrl: string;
  rectangleUrl: string;
  pcSquareUrl: string;
  pcRectangleUrl: string;
  format: string;
  width: number;
}

export interface IMv {
  id: number;
  name: string;
  status: number;
  artist: IArtist;
  artistName: string;
  imgurl: string;
  imgurl16v9: string;
  artists: IArtist;
  playCount: number;
  height: number;
  width: number;
}

export interface IEventInfo {
  commentThread: {
    id: string;
    resourceInfo: null;
    resourceType: number;
    commentCount: number;
    likedCount: number;
    shareCount: number;
    hotCount: number;
    latestLikedUsers: null;
    resourceTitle: string;
    resourceId: number;
    resourceOwnerId: number;
    extProperties: null;
    xInfo: null;
  };
  latestLikedUsers: null;
  liked: boolean;
  comments: null;
  resourceType: number;
  resourceId: number;
  likedCount: number;
  commentCount: number;
  shareCount: number;
  threadId: string;
}

export interface IEvent {
  id: number;
  actName: string;
  actId: number;
  eventTime: number;
  ipLocation: IPLocation;
  pics: IPic[];
  user: IUser;
  info: IEventInfo;
  json: {
    msg: string;
    song?: ISong;
    title: string;
    mv?: IMv;
  };
}

export interface IEventData {
  code: number;
  events: IEvent[];
  lasttime: number;
  more: boolean;
  size: number;
}
