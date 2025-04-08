'use client';
import { AtomIcon } from 'lucide-react';
import { Button } from '../ui/button';
import OpenAI from 'openai';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Suspense, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Skeleton } from '../ui/skeleton';
import Config from './Config';
import useAIConfig from '@/hooks/useAIConfig';
import Copy from '../Copy';

export default function AI({ content }: { content: string }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    config: { baseURL, model, apiKey },
  } = useAIConfig();

  const getMessage = async () => {
    setLoading(true);
    setText('');
    const openai = new OpenAI({
      baseURL,
      apiKey,
      dangerouslyAllowBrowser: true,
    });

    const stream = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            '以下是我在网易云音乐收藏的歌曲,请根据歌曲的名称与演唱艺人信息，专业、深刻地评价下我的听歌品味，并解析下我的内心世界',
        },
        { role: 'user', content },
      ],
      model,
      stream: true,
    });

    setLoading(false);

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      setText((t) => t + content);
    }
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
          {baseURL && model && apiKey ? (
            <>
              <div>
                <div className='flex items-center justify-between p-2 border-b'>
                  <h2 className='text-lg'>歌单分析</h2>
                  {text && <Copy content={text} />}
                </div>
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
                  <div className='h-96 overflow-auto whitespace-pre-line markdown-body p-2'>
                    <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Config />
          )}
        </PopoverContent>
      </Popover>
    </Suspense>
  );
}
