import React, { useState } from 'react';
import QR from './QR';
import Phone from './Phone';
import cls from 'classnames';

interface LoginForm {
  phone: string;
  captcha: string;
}

interface Props {
  onSuccess: () => void;
}

const Login: React.FC<Props> = ({ onSuccess }) => {
  const [type, setType] = useState<'qr' | 'phone'>('qr');

  return (
    <div className=''>
      <div className={cls('flex items-center p-4 border-b divide-x')}>
        <div
          className={cls(
            'flex-1 text-center cursor-pointer',
            type === 'qr' && 'text-blue-600 font-semibold'
          )}
          onClick={() => setType('qr')}
        >
          二维码登录
        </div>
        <div
          className={cls(
            'flex-1 text-center cursor-pointer',
            type === 'phone' && 'text-blue-600 font-semibold'
          )}
          onClick={() => setType('phone')}
        >
          手机验证码登录
        </div>
      </div>
      {type === 'qr' ? (
        <QR onSuccess={onSuccess} />
      ) : (
        <Phone onSuccess={onSuccess} />
      )}
    </div>
  );
};

export default Login;
