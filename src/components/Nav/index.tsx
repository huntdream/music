import { Avatar, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import cls from 'classnames';
import useSWR from 'swr';
import { useUser } from '../../context/App';
import { IUser } from '../../types/user';
import fetcher from '../../utils/fetcher';

import Login from '../Login';
import './style.scss';

interface Props {}

const Nav: React.FC<Props> = () => {
  const [showQr, setShowQr] = useState(false);
  const [, setUser] = useUser();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    document.addEventListener('scroll', checkScroll);

    return () => document.removeEventListener('scroll', checkScroll);
  }, []);

  const getAccount = (url: string) =>
    fetcher<any, { profile: IUser }>(url, {
      params: {
        timestamp: new Date().getTime(),
      },
    }).then((res) => {
      setUser(res.profile);
      return res.profile;
    });

  const { data } = useSWR<IUser>(`/user/account`, getAccount);

  const handleLoginSuccess = () => {
    setTimeout(() => {
      setShowQr(false);
      getAccount('/user/account');
    }, 500);
  };

  const handleUserClick = () => {
    if (data) {
    } else {
      setShowQr(true);
    }
  };

  return (
    <div
      className={cls('nav', {
        'nav-scrolled': scrolled,
      })}
    >
      <NavLink to='/' className='nav-link' end>
        Home
      </NavLink>
      <NavLink to='/me' className='nav-link'>
        Library
      </NavLink>
      <NavLink to='/moments' className='nav-link'>
        Moments
      </NavLink>
      <div className='nav-user' onClick={handleUserClick}>
        <Avatar src={data?.avatarUrl} />
        <span className='nav-user-name'>{data?.nickname}</span>
      </div>
      <Modal
        title='二维码登录'
        open={showQr}
        onCancel={() => setShowQr(false)}
        footer={null}
        destroyOnClose
      >
        <Login onSuccess={handleLoginSuccess} />
      </Modal>
    </div>
  );
};

export default Nav;
