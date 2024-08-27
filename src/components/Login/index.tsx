import React, { MouseEvent, useState } from 'react';
import Button from '../Button';
import fetcher from '../../utils/fetcher';
import Input from '../Input';
import toast from 'react-hot-toast';
import QR from './QR';
import Phone from './Phone';

interface LoginForm {
  phone: string;
  captcha: string;
}

interface Props {
  onSuccess: () => void;
}

const Login: React.FC<Props> = ({ onSuccess }) => {
  const [type, setType] = useState<'qr' | 'phone'>('phone');

  if (type === 'qr') {
    return <QR onSuccess={onSuccess} />;
  }

  return <Phone onSuccess={onSuccess} />;
};

export default Login;
