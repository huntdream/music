import { CSSProperties, FC, MouseEvent } from 'react';

interface IconProps {
  className?: string;
  onClick?: (e: MouseEvent) => void;
  style?: CSSProperties;
}

export const VolumeIcon: FC<IconProps> = (props) => (
  <svg viewBox='0 0 24 24' preserveAspectRatio='xMidYMid meet' {...props}>
    <g fill='#fff'>
      <path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z'></path>
    </g>
  </svg>
);

export const PlayIcon: FC<IconProps> = (props) => (
  <svg viewBox='0 0 24 24' preserveAspectRatio='xMidYMid meet' {...props}>
    <g fill='#fff'>
      <path d='M8 5v14l11-7z'></path>
    </g>
  </svg>
);

export const PauseIcon: FC<IconProps> = (props) => (
  <svg viewBox='0 0 24 24' preserveAspectRatio='xMidYMid meet' {...props}>
    <g>
      <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z'></path>
    </g>
  </svg>
);

export const NextIcon: FC<IconProps> = (props) => (
  <svg viewBox='0 0 24 24' preserveAspectRatio='xMidYMid meet' {...props}>
    <g>
      <path d='M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z'></path>
    </g>
  </svg>
);

export const PrevIcon: FC<IconProps> = (props) => (
  <svg viewBox='0 0 24 24' preserveAspectRatio='xMidYMid meet' {...props}>
    <g>
      <path d='M6 6h2v12H6zm3.5 6l8.5 6V6z'></path>
    </g>
  </svg>
);

export const PlaylistIcon: FC<IconProps> = (props) => (
  <svg
    viewBox='0 0 24 24'
    fill='currentColor'
    preserveAspectRatio='xMidYMid meet'
    {...props}
  >
    <g>
      <path d='M0 0h24v24H0z' fill='none'></path>
      <path d='M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z'></path>
    </g>
  </svg>
);

export const AlbumIcon: React.FC<IconProps> = (props) => {
  return (
    <svg {...props} viewBox='0 0 1024 1024' fill='currentColor'>
      <path
        d='M511.701333 511.701333m-85.632 0a85.632 85.632 0 1 0 171.264 0 85.632 85.632 0 1 0-171.264 0Z'
        p-id='11189'
      ></path>
      <path
        d='M512 85.333333C276.736 85.333333 85.333333 276.736 85.333333 512s191.402667 426.666667 426.666667 426.666667 426.666667-191.402667 426.666667-426.666667S747.264 85.333333 512 85.333333z m0 768c-188.202667 0-341.333333-153.130667-341.333333-341.333333s153.130667-341.333333 341.333333-341.333333 341.333333 153.130667 341.333333 341.333333-153.130667 341.333333-341.333333 341.333333z'
        p-id='11190'
      ></path>
      <path
        d='M512 256c-141.184 0-256 114.816-256 256h85.333333c0-94.122667 76.544-170.666667 170.666667-170.666667V256z'
        p-id='11191'
      ></path>
    </svg>
  );
};
