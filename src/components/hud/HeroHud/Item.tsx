import { ReactNode } from 'react';

export function Item({ count, src }: { count: number; src: string }) {
  return (
    <div className="flex items-baseline w-fit relative mr-2">
      <img
        src={src}
        alt="Energy drink count"
        className="w-12 h-12 leading-none"
      />
      <h1 className="text-white text-lg font-semibold leading-5 shadow-border rounded-lg translate-x-1/3 text-shadow-2 absolute bottom-0 right-0">
        {count + 21}
      </h1>
    </div>
  );
}

// bg-slate-900;
