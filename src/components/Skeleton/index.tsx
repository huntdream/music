import React from 'react';

interface Props {}

const Skeleton: React.FC<Props> = () => {
  return (
    <div className='p-4 w-full h-full animate-pulse shadow-around rounded-md'>
      <div className='flex-1 py-1'>
        <div className='space-y-3'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='h-2 bg-slate-200 rounded-sm col-span-2'></div>
            <div className='h-2 bg-slate-200 rounded-sm col-span-1'></div>
          </div>
          <div className='h-2 bg-slate-200 rounded-sm'></div>
          <div className='h-2 bg-slate-200 rounded-sm'></div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='h-2 bg-slate-200 rounded-sm col-span-2'></div>
            <div className='h-2 bg-slate-200 rounded-sm col-span-1'></div>
          </div>
          <div className='h-2 bg-slate-200 rounded-sm'></div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='h-2 bg-slate-200 rounded-sm col-span-1'></div>
            <div className='h-2 bg-slate-200 rounded-sm col-span-2'></div>
          </div>
          <div className='h-2 bg-slate-200 rounded-sm'></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
