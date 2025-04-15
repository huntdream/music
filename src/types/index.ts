export interface IPLocation {
  ip: string;
  location: string;
}

export const ResourceTypes = {
  song: 0,
  mv: 1,
  playlist: 2,
  album: 3,
  show: 4,
  video: 5,
  post: 6,
  podcast: 7,
};

export type IResourceType = keyof typeof ResourceTypes;

export interface IResponse<T = undefined> {
  code: number;
  message: string;
  data: T;
}
