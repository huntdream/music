import React from 'react';
import { Link } from 'react-router-dom';
import cls from 'classnames';
import { ISong } from '../../types/song';
import './style.scss';
import usePlayer from '../../context/App/usePlayer';

interface Props {
  song: ISong;
  className?: string;
}

const Song: React.FC<Props> = ({ song, className }) => {
  const { play } = usePlayer();

  return (
    <div className={cls('song', className)} onClick={() => play(song)}>
      <div className='song-cover'>
        <img
          className='song-cover-img'
          src={`${song.al?.picUrl}?param=50y50`}
          alt=''
        />
      </div>
      <div className='song-info'>
        <div className='song-name'>
          <span className='ellipsis' title={song.name}>
            {song.name}
          </span>
        </div>
        <div className='song-aral'>
          <div className='song-artists ellipsis'>
            {song.ar?.map((ar) => (
              <Link
                to={`/artist/${ar.id}`}
                className='song-artist'
                key={ar.id}
                title={ar.name}
              >
                {ar.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Song;
