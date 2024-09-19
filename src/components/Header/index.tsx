import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import cls from 'classnames';
import useSWR from 'swr';
import { useUser } from '../../context/App';
import { IUser } from '../../types/user';
import fetcher from '../../utils/fetcher';

import Login from '../Login';
import './style.scss';
import User from '../User';
import Modal from '../Modal';
import Button from '../Button';

interface Props {}

const Header: React.FC<Props> = () => {
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
    <div className='nav'>
      {user?.userId ? (
        <div className='nav-user'>
          <User user={user} />
        </div>
      ) : (
        <Button onClick={handleLogin} className='nav-login'>
          Log in
        </Button>
      )}
      <Modal title='登录' visible={showQr} onClose={() => setShowQr(false)}>
        <Login onSuccess={handleLoginSuccess} />
      </Modal>
    </div>
  );
};

export default Header;
