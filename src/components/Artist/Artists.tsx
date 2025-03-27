import { FC } from 'react';
import { IArtist } from '../../types/playlist';
import { Link } from 'react-router-dom';

interface Props {
  artists?: IArtist[];
}

const Artists: FC<Props> = ({ artists }) => {
  return artists?.map((ar) => (
    <Link
      to={`/artist/${ar.id}`}
      className='no-underline relative text-secondary-foreground ml-2 first-of-type:ml-0 hover:underline after:content-["/"] after:mx-0.5 after:absolute last:after:content-[""]'
      key={ar.name}
      title={ar.name}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {ar.name}
    </Link>
  ));
};

export default Artists;
