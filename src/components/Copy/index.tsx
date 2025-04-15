import React from 'react';
import { Button } from '../ui/button';
import { Check, Copy as CopyIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';

interface CopyProps {
  content: string;
}

const Copy: React.FC<CopyProps> = ({ content }) => {
  const [copied, setCopied] = React.useState(false);
  const copyTimeout = React.useRef<number>(0);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('已复制到剪贴板');
      setCopied(true);

      if (copyTimeout.current) {
        clearTimeout(copyTimeout.current);
      }

      copyTimeout.current = window.setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      setCopied(false);
      toast.error('复制失败，请重试');
      clearTimeout(copyTimeout.current);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='ghost'
          disabled={!content}
          size='icon'
          onClick={handleCopy}
          tabIndex={-1}
        >
          {copied ? <Check /> : <CopyIcon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{copied ? '已复制' : '复制到剪贴板'}</TooltipContent>
    </Tooltip>
  );
};

export default Copy;
