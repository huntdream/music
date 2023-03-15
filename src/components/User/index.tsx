import React from 'react';
import cls from 'classnames';
import { IUser } from '../../types/user';

interface Props {
  user: IUser;
  size?: 'small' | 'normal';
  signature?: boolean;
}

const User: React.FC<Props> = ({ user, signature, size = 'normal' }) => {
  const sizes = {
    small: 'w-6 h-6',
    normal: 'w-10 h-10',
  };

  return (
    <div>
      <div className='flex items-center mb-2'>
        <img
          className={cls('mr-2 rounded', sizes[size])}
          src={user.avatarUrl}
          alt=''
        />
        <div className='flex-1 overflow-hidden'>
          <div>{user.userId}</div>
          {signature && (
            <div className='text-gray-600 text-sm truncate'>
              {user.signature}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
