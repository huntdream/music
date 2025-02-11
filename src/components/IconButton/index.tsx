import React from 'react';
import { Button, buttonVariants } from '../ui/button';
import { VariantProps } from 'class-variance-authority';

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>;

interface IconButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Button
      size='icon'
      variant='ghost'
      asChild
      {...props}
      className={`p-1.5 cursor-pointer ${className}`}
    >
      {children}
    </Button>
  );
};

export default IconButton;
