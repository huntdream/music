import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { useUser } from '../../context/App';
import { IUser } from '../../types/user';
import fetcher from '../../utils/fetcher';
import Image from '../Image';
import Loading from '../Loading';
import User from '../User';

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

const QR: React.FC<Props> = ({ onSuccess }) => {
  const [qrKey, setQrKey] = useState('');
  const [qrImg, setQrImg] = useState('');
  const [, setUser] = useUser();

  const prevStatus = useRef<any>();

  const checkLoginStatus = (url: string) => {
    return fetcher<any, LoginStatus>(url, {
      params: {
        timestamp: new Date().getTime(),
      },
    }).then((res) => {
      if (res.code === 803) {
        localStorage.setItem('cookie', res.cookie);

        fetcher<any, any>('/login/status', {
          method: 'post',
          data: {
            cookie: res.cookie,
          },
        }).then((res) => {
          setUser(res.data.profile);
          return res.data.profile;
        });

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
      params: {
        timestamp: Date.now(),
      },
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
    <div className='flex flex-col justify-center items-center h-72'>
      {showAvatar ? (
        <User className='my-1' user={status as unknown as IUser} />
      ) : qrImg ? (
        <Image src={qrImg} className='w-44 h-44' alt='QR' />
      ) : (
        <Loading />
      )}
      <div className='leading-4 h-4 mt-4 text-secondary-foreground'>
        {status?.message}
      </div>
    </div>
  );
};

export default QR;
