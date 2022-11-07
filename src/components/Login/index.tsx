import { Avatar } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import './style.scss';

interface LoginStatus {
  code: number;
  nickname: string;
  message: string;
  avatarUrl: string;
  cookie: string;
}

interface Props {
  onSuccess?: () => void;
}

const Login: React.FC<Props> = ({ onSuccess }) => {
  const [qrKey, setQrKey] = useState('');
  const [qrImg, setQrImg] = useState('');
  const prevStatus = useRef<any>();

  const checkLoginStatus = (url: string) => {
    return fetcher<any, LoginStatus>(url, {
      params: {
        timestamp: new Date().getTime(),
      },
      withCredentials: false,
    }).then((res) => {
      if (res.code === 803) {
        if (onSuccess) {
          onSuccess();
        }

        if (prevStatus.current?.code === 802) {
          const { nickname, avatarUrl } = prevStatus.current;
          return { ...res, nickname, avatarUrl };
        }
      }

      prevStatus.current = res;

      return res;
    });
  };

  const { data: status } = useSWR(
    qrImg ? `/login/qr/check?key=${qrKey}` : null,
    checkLoginStatus,
    {
      revalidateOnFocus: false,
      refreshInterval: (statusData: any) => {
        if (statusData?.code === 803) {
          return 0;
        }

        if (statusData?.code === 800) {
          return 0;
        }

        return 2000;
      },
    }
  );

  const getQrCode = () => {
    fetcher('/login/qr/key', {
      withCredentials: false,
    }).then((res) => {
      if (res.data.code === 200) {
        setQrKey(res.data.unikey);

        return fetcher('/login/qr/create', {
          params: {
            key: res.data.unikey,
            qrimg: true,
          },
          withCredentials: false,
        }).then((res) => {
          setTimeout(() => {
            setQrImg(res.data.qrimg);
          }, 300);
        });
      }
    });
  };

  useEffect(() => {
    getQrCode();
  }, []);

  const showAvatar = status?.code === 802 || status?.code === 803;

  return (
    <div className='login'>
      {showAvatar ? (
        <>
          <Avatar src={status.avatarUrl} size={64} />
          <div className='login-nickname'>{status.nickname}</div>
        </>
      ) : (
        <img src={qrImg} className='login-qr-img' alt='QR' />
      )}
      <div className='login-qr-status'>{status?.message}</div>
    </div>
  );
};

export default Login;
