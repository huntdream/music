import React, { useState, MouseEvent } from 'react';
import { toast } from 'sonner';
import fetcher from '../../utils/fetcher';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';

interface Props {
  onSuccess: () => void;
}

const Phone: React.FC<Props> = ({ onSuccess }) => {
  const [submitting, setSubmitting] = useState(false);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isSent, setIsSent] = useState(false);

  const onSubmit = (e: MouseEvent) => {
    e.preventDefault();
    setSubmitting(true);
    fetcher(`/login/cellphone?phone=${phone}&captcha=${code}`, {
      params: {
        timestamp: new Date().getTime(),
      },
    })
      .then((res: any) => {
        if (res.code === 200) {
          toast(`${res.profile.nickname}，欢迎回来👏`);
          onSuccess();
        }
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
        setIsSent(true);
      }
    });
  };

  return (
    <div>
      <div className='px-6 py-4'>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>提示</AlertTitle>
          <AlertDescription>
            验证码登录服务暂不可用，请使用二维码登录
          </AlertDescription>
        </Alert>
        <div className='mt-4'>
          <Label htmlFor='phone'>手机号码</Label>
          <Input
            value={phone}
            id='phone'
            onChange={(e) => setPhone(e.target.value)}
            placeholder='请输入手机号码'
          />
        </div>

        <div className='mt-4'>
          <Label htmlFor='code' className='mt-2'>
            验证码
          </Label>
          <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input
              value={code}
              id='code'
              onChange={(e) => setCode(e.target.value)}
              autoComplete='off'
              placeholder='请输入验证码'
            />
            <Button disabled={!phone || isSent} onClick={handleSend}>
              发送验证码
            </Button>
          </div>
        </div>

        <div className='mt-8 mb-6'>
          <Button
            className='w-full'
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

export default Phone;
