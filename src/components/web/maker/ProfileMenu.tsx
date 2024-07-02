import { Label } from '@/components/ui/primitives/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/primitives/popover';
import { Button } from '@/components/ui/primitives/Button';
import { Input } from '@/components/ui/primitives/Input';
import { cn } from '@/utils/helpers';
import { CircleUserIcon, MenuIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LabeledButton } from '@/components/ui/shared/LabeledButton';
import { DashAside } from '@/components/web/dash/DashAside';
import { dashTabs } from '@/utils/consts';

export function ProfileMenu({ boardSize, setBoardSize, shadow = true }: any) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="absolute border border-slate-200 top-3 left-3 overflow-hidden p-1 bg-white w-fit ml-auto mr-0 rounded-full flex items-center z-[9999]">
          <LabeledButton
            // onClick={() => setIsLayersOpen((prev: boolean) => !prev)}
            size="sm"
            className="px-0 pr-2 rounded-2xl"
          >
            {/* <Avatar className="w-8 h-8">
            <AvatarFallback>G</AvatarFallback>
          </Avatar> */}
            <CircleUserIcon className="w-8 h-8 stroke-[1.5]" />
            <MenuIcon className={`w-4 h-4 subpixel-antialiased`} />
            {/* <span className="text-zinc-500 font-normal">Menu</span> */}
          </LabeledButton>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-60 p-3" side="bottom" align="start">
        <DashAside justTabs defaultSelected={dashTabs['maker'].id} />
      </PopoverContent>
    </Popover>
  );
}
