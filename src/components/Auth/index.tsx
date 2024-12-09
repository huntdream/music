import React, { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import cls from 'classnames';
import { useUser } from '../../context/App';
import { IUser } from '../../types/user';
import fetcher from '../../utils/fetcher';
import Login from '../Login';
import User from '../User';
import Modal from '../Modal';
import Button from '../Button';
import useAccount from '../../fetchers/useAccount';

interface Props {
  className?: string;
  page?: boolean;
}

const Auth: React.FC<Props> = ({ className, page }) => {
  const [showQr, setShowQr] = useState(false);
  const [user, setUser] = useUser();
  const { mutate } = useSWRConfig();

  const handleLoginSuccess = () => {
    setTimeout(() => {
      setShowQr(false);
      mutate('/user/account');
    }, 500);
  };

  const handleLogin = () => {
    if (user?.userId) {
    } else {
      setShowQr(true);
    }
  };

  return (
    <div
      className={cls(
        page ? ' h-full w-full flex justify-center items-center' : '',
        className
      )}
    >
      {user?.userId ? (
        <User user={user} />
      ) : (
        <Button onClick={handleLogin}>登录</Button>
      )}
      <Modal title='登录' visible={showQr} onClose={() => setShowQr(false)}>
        <Login onSuccess={handleLoginSuccess} />
      </Modal>
    </div>
  );
};

export default Auth;
