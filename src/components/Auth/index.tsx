import React, { useState } from 'react';
import { useSWRConfig } from 'swr';
import clsx from 'clsx';
import { useUser } from '../../context/App';
import Login from '../Login';
import User from '../User';
import Modal from '../Modal';
import { Button } from '@/components/ui/button';

interface Props {
  className?: string;
  page?: boolean;
}

const Auth: React.FC<Props> = ({ className, page }) => {
  const [showQr, setShowQr] = useState(false);
  const [user] = useUser();
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

  return user?.userId ? null : (
    <div
      className={clsx(
        page ? ' h-full w-full flex justify-center items-center' : '',
        className
      )}
    >
      <Button onClick={handleLogin}>登录</Button>
      <Modal title='登录' visible={showQr} onClose={() => setShowQr(false)}>
        <Login onSuccess={handleLoginSuccess} />
      </Modal>
    </div>
  );
};

export default Auth;
