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
      className='no-underline relative text-secondary ml-2 first:ml-0 hover:underline after:content-["/"] after:mx-0.5 after:absolute last:after:content-[""]'
      key={ar.id}
      title={ar.name}
    >
      {ar.name}
    </Link>
  ));
};

export default Artists;
