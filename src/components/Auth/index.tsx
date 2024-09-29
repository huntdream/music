import React, { useState } from 'react';
import useSWR from 'swr';
import cls from 'classnames';
import { useUser } from '../../context/App';
import { IUser } from '../../types/user';
import fetcher from '../../utils/fetcher';
import Login from '../Login';
import User from '../User';
import Modal from '../Modal';
import Button from '../Button';

interface Props {
  className?: string;
  page?: boolean;
}

const Auth: React.FC<Props> = ({ className, page }) => {
  const [showQr, setShowQr] = useState(false);
  const [user, setUser] = useUser();

  const getAccount = (url: string) =>
    fetcher<any, { profile: IUser }>(url, {
      params: {
        timestamp: new Date().getTime(),
      },
    }).then((res) => {
      setUser(res.profile);
      return res.profile;
    });

  const { mutate } = useSWR<IUser>(`/user/account`, getAccount);

  const handleLoginSuccess = () => {
    setTimeout(() => {
      setShowQr(false);
      mutate();
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
