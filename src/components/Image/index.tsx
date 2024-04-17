import React, { ImgHTMLAttributes } from 'react';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {}

const Image: React.FC<Props> = ({ src, ...props }) => {
  return (
    <img src={src?.replace(/http:/, 'https:')} {...props} loading='lazy' />
  );
};

export default Image;
