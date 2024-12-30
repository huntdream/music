import { FC } from 'react';
import usePlayer from '../Player/usePlayer';

interface TitleProps {
  children?: string;
}

const Title: FC<TitleProps> = ({ children }) => {
  const { playingSong } = usePlayer();

  const title = playingSong
    ? `${playingSong.name} - ${playingSong.ar.map((ar) => ar.name).join('/')}`
    : children;

  if (!title) {
    return null;
  }

  return <title>{title}</title>;
};

export default Title;
