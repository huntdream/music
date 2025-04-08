import { IArtist } from './artist';

export interface IAlbum {
  id: string;
  name: string;
  picUrl: string;
  artists: IArtist[];
  size: number;
  publishTime: number;
  description: string;
}
