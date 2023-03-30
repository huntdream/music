import React, { ImgHTMLAttributes } from 'react';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {}

const Image: React.FC<Props> = ({ src, ...props }) => {
  return <img src={src} {...props} loading='lazy' />;
};

export default Image;
