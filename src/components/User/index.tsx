import React from 'react';
import clsx from 'clsx';
import { IUser } from '../../types/user';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Props {
  user: IUser;
  avatar?: boolean;
  size?: 'small' | 'normal' | 'large';
  signature?: boolean;
  className?: string;
}

const User: React.FC<Props> = ({
  user,
  signature,
  size = 'normal',
  avatar,
  className,
}) => {
  return (
    <div>
      <div className={clsx('flex items-center', className)}>
        <Avatar>
          <AvatarImage src={user?.avatarUrl} />
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
