import { IUser } from '@/types/user';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Mars, Venus } from 'lucide-react';

interface Props {
  user: IUser;
}

const Info: React.FC<Props> = ({ user }) => {
  const { backgroundUrl, avatarUrl, nickname, gender, signature } = user;

  return (
    <div className='h-80 flex justify-center relative'>
      <img
        src={backgroundUrl}
        className='w-full h-full object-cover absolute top-0 left-0 brightness-50 -z-20'
      />
      <div className='absolute h-full w-full top-0 left-0 backdrop-blur-sm -z-10'></div>
      <div className='mt-16 flex flex-col items-center'>
        <Avatar className='w-20 h-20 border-3 border-white bg-white shadow-md shadow-black/20'>
          <AvatarImage src={avatarUrl} alt='Avatar' />
        </Avatar>
        <div className='mt-4 flex items-center relative'>
          <div className='text-white text-xl font-bold mx-6'>{nickname}</div>
          <div className='ml-2 absolute right-0'>
            {gender === 1 ? (
              <Mars size={16} color='blue' />
            ) : gender === 2 ? (
              <Venus size={16} color='red' />
            ) : null}
          </div>
        </div>
        <div>
          <div className='text-white text-sm font-bold mt-2'>{signature}</div>
        </div>
      </div>
    </div>
  );
};

export default Info;
