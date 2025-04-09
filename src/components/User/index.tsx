import React from 'react';
import clsx from 'clsx';
import { IUser } from '../../types/user';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useNavigate } from 'react-router-dom';

interface Props {
  user: IUser;
  avatar?: boolean;
  signature?: boolean;
  className?: string;
}

const User: React.FC<Props> = ({ user, signature, avatar, className }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (user?.userId) {
      navigate(`/user/${user.userId}`);
    }
  };

  return (
    <div>
      <div
        className={clsx(
          'inline-flex items-center cursor-pointer hover:text-blue-400',
          className
        )}
        onClick={handleNavigate}
      >
        <Avatar>
          <AvatarImage src={`${user?.avatarUrl}?param=150y150`} />
          <AvatarFallback delayMs={600}>
            {user?.nickname?.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {!avatar && (
          <div className='flex-1 overflow-hidden ml-2'>
            <div>{user.nickname}</div>
            {signature && (
              <div className='text-secondary-foreground text-sm truncate'>
                {user.signature}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
