import React from 'react';
import cls from 'classnames';
import { IUser } from '../../types/user';
import Image from '../Image';

interface Props {
  user: IUser;
  avatar?: boolean;
  size?: 'small' | 'normal' | 'large';
  signature?: boolean;
}

const User: React.FC<Props> = ({
  user,
  signature,
  size = 'normal',
  avatar,
}) => {
  const sizes = {
    small: 'w-6 h-6',
    normal: 'w-8 h-8',
    large: 'w-10 h-10',
  };

  return (
    <div>
      <div className='flex items-center mb-2'>
        <Image
          className={cls('rounded', sizes[size])}
          src={user.avatarUrl}
          alt=''
        />
        {!avatar && (
          <div className='flex-1 overflow-hidden ml-2'>
            <div>{user.nickname}</div>
            {signature && (
              <div className='text-gray-600 text-sm truncate'>
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
