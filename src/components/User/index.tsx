import React from 'react';
import cls from 'classnames';
import { IUser } from '../../types/user';
import Image from '../Image';

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
  const sizes = {
    small: 'w-6 h-6',
    normal: 'w-8 h-8',
    large: 'w-10 h-10',
  };

  return (
    <div>
      <div className={cls('flex items-center', className)}>
        <Image
          className={cls('rounded-sm', sizes[size])}
          src={user.avatarUrl}
          alt=''
        />
        {!avatar && (
          <div className='flex-1 overflow-hidden ml-2'>
            <div>{user.nickname}</div>
            {signature && (
              <div className='text-secondary text-sm truncate'>
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
