import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { useUser } from '../../context/App';
import { IUser } from '../../types/user';
import fetcher from '../../utils/fetcher';
import Image from '../Image';
import Loading from '../Loading';
import User from '../User';
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
        if (onSuccess) {
          onSuccess();
        }

        fetcher<any, { profile: IUser }>('/user/account', {
          params: {
            timestamp: new Date().getTime(),
          },
        }).then((res) => {
          setUser(res.profile);
          return res.profile;
        });

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
    <div className='qrcode'>
      {showAvatar ? (
        <>
          <User user={status as unknown as IUser} />
          <div className='qrcode-nickname'>{status.nickname}</div>
        </>
      ) : qrImg ? (
        <Image src={qrImg} className='qrcode-qr-img' alt='QR' />
      ) : (
        <Loading />
      )}
      <div className='qrcode-qr-status'>{status?.message}</div>
    </div>
  );
};

export default QR;
