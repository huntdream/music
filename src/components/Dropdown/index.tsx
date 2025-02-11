import React, { ReactNode, ForwardedRef } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'clsx';
import { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';

interface DropdownMenuContentProps {
  children: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
}

interface DropdownMenuCheckboxItemProps
  extends DropdownMenuPrimitive.DropdownMenuCheckboxItemProps {
  checked: boolean | 'indeterminate';
  children: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
}

interface DropdownMenuRadioItemProps
  extends DropdownMenuPrimitive.DropdownMenuRadioItemProps {
  children: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
}

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = ({
  children,
  className,
  onClick,
  ...props
}: DropdownMenuPrimitive.DropdownMenuTriggerProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <DropdownMenuPrimitive.Trigger
      {...props}
      className={classNames('outline-hidden', className)}
      onClick={handleClick}
    >
      {children}
    </DropdownMenuPrimitive.Trigger>
  );
};

export const DropdownMenuContent = React.forwardRef(
  (
    { children, className, onClick, ...props }: DropdownMenuContentProps,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ) => {
    const handleClick = (event: React.MouseEvent) => {
      event.stopPropagation();
      if (onClick) {
        onClick(event);
      }
    };

    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          {...props}
          ref={forwardedRef}
          className={classNames(
            'outline-hidden mx-4 bg-white z-50 rounded-md p-2 shadow-around min-w-40',
            className
          )}
          onClick={handleClick}
        >
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    );
  }
);

export const DropdownMenuLabel = DropdownMenuPrimitive.Label;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

export const DropdownMenuItem = React.forwardRef(
  (
    { children, className, onClick, ...props }: DropdownMenuItemProps,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (onClick) {
        onClick(event);
      }
    };

    return (
      <DropdownMenuPrimitive.Item
        {...props}
        ref={forwardedRef}
        className={classNames(
          'outline-hidden cursor-pointer px-2 h-8 flex items-center rounded-sm hover:bg-secondary',
          className
        )}
        onClick={handleClick}
      >
        {children}
      </DropdownMenuPrimitive.Item>
    );
  }
);

export const DropdownMenuCheckboxItem = React.forwardRef(
  (
    {
      children,
      checked,
      className,
      onClick,
      ...props
    }: DropdownMenuCheckboxItemProps,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ) => {
    const handleClick = (event: React.MouseEvent) => {
      event.stopPropagation();
      if (onClick) {
        onClick(event);
      }
    };

    return (
      <DropdownMenuPrimitive.CheckboxItem
        {...props}
        ref={forwardedRef}
        className={classNames(
          'outline-hidden cursor-pointer hover:bg-secondary',
          className
        )}
        onClick={handleClick}
      >
        {children}
        <DropdownMenuPrimitive.ItemIndicator></DropdownMenuPrimitive.ItemIndicator>
      </DropdownMenuPrimitive.CheckboxItem>
    );
  }
);

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenuRadioItem = React.forwardRef(
  (
    { children, className, onClick, ...props }: DropdownMenuRadioItemProps,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ) => {
    const handleClick = (event: React.MouseEvent) => {
      event.stopPropagation();
      if (onClick) {
        onClick(event);
      }
    };

    return (
      <DropdownMenuPrimitive.RadioItem
        {...props}
        ref={forwardedRef}
        className={classNames(
          'outline-hidden cursor-pointer hover:bg-secondary',
          className
        )}
        onClick={handleClick}
      >
        {children}
        <DropdownMenuPrimitive.ItemIndicator></DropdownMenuPrimitive.ItemIndicator>
      </DropdownMenuPrimitive.RadioItem>
    );
  }
);

export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;
