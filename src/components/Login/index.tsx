import React, { MouseEvent, useState } from 'react';
import Button from '../Button';
import fetcher from '../../utils/fetcher';
import Input from '../Input';
import toast from 'react-hot-toast';

interface LoginForm {
  phone: string;
  captcha: string;
}

interface Props {
  onSuccess: () => void;
}

const Login: React.FC<Props> = ({ onSuccess }) => {
  const [submitting, setSubmitting] = useState(false);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  const onSubmit = (e: MouseEvent) => {
    e.preventDefault();
    setSubmitting(true);
    fetcher(`/login/cellphone?phone=${phone}&captcha=${code}`)
      .then((res: any) => {
        if (res.code === 200) {
          toast(`${res.profile.nickname}，欢迎回来👏`);
          onSuccess();
        }
      })
      .catch((res: any) => {
        toast.error(res.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleSend = (e: MouseEvent) => {
    e.preventDefault();
    if (!phone) {
      return toast('请输入手机号码');
    }
    fetcher(`/captcha/sent?phone=${phone}`).then((res: any) => {
      if (res.code === 200) {
        toast('验证码已发送！');
      }
    });
  };

  return (
    <div>
      <div className='px-12 py-4'>
        <Input
          label='Phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className='flex items-end justify-between mt-2'>
          <Input
            label='Code'
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button disabled={!phone} onClick={handleSend}>
            Send
          </Button>
        </div>
        <div className='mt-8 mb-6'>
          <Button
            pirmary
            wide
            disabled={submitting || !phone || !code}
            onClick={onSubmit}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
