import { AtomIcon, Settings, Undo2 } from 'lucide-react';
import { Button } from '../ui/button';
import OpenAI from 'openai';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FC, ReactNode, Suspense, useState } from 'react';
import Markdown from 'react-markdown';
import { Skeleton } from '../ui/skeleton';
import Config from './Config';
import useAIConfig from '@/hooks/useAIConfig';
import Copy from '../Copy';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface Props {
  action?: (text: string, loaded: boolean) => ReactNode;
  content: string;
}

const AI: FC<Props> = ({ content, action }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const {
    config: { baseURL, model, apiKey },
  } = useAIConfig();

  const getMessage = async () => {
    setLoading(true);
    setLoaded(false);
    setText('');
    const openai = new OpenAI({
      baseURL,
      apiKey,
      dangerouslyAllowBrowser: true,
    });

    const stream = await openai.chat.completions
      .create({
        messages: [
          {
            role: 'system',
            content:
              '以下是我在网易云音乐收藏的歌曲,请根据歌曲的名称与演唱艺人信息，专业、深刻地评价下我的听歌品味，分析整体风格倾向，并解析下我的内心世界。使用Markdown格式输出',
          },
          { role: 'user', content },
        ],
        model,
        stream: true,
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

    if (!stream) {
      setLoaded(true);
      return;
    }

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      setText((t) => t + content);
    }

    setLoaded(true);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='ghost' size='icon'>
            <AtomIcon size={36} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-96 p-0'>
          <div className='flex items-center justify-between p-2 border-b'>
            <h2 className='text-lg'>歌单分析</h2>
            <div className='flex items-center gap-2'>
              {action && action(text, loaded)}
              <Copy content={text} />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => setShowSettings(!showSettings)}
                    tabIndex={-1}
                  >
                    {showSettings ? <Undo2 /> : <Settings />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {showSettings ? '返回' : '接入点设置'}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          {showSettings ? (
            <Config onSave={() => setShowSettings(false)} />
          ) : (
            <>
              <div>
                <div className='p-2'>
                  {!text && (
                    <Button
                      variant='outline'
                      className='w-full'
                      onClick={getMessage}
                      disabled={loading}
                    >
                      {loading ? (
                        <div className='flex items-center gap-2'>
                          <span>Loading...</span>
                          <Skeleton className='h-4 w-4' />
                        </div>
                      ) : (
                        '获取分析'
                      )}
                    </Button>
                  )}
                </div>
                {text && (
                  <div className='h-96 overflow-auto prose p-2'>
                    <Markdown>{text}</Markdown>
                  </div>
                )}
              </div>
            </>
          )}
        </PopoverContent>
      </Popover>
    </Suspense>
  );
};

export default AI;
