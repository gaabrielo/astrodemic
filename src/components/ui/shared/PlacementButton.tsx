import { Button } from '@/components/ui/primitives/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/primitives/tooltip';
import { cn } from '@/utils/helpers';

export function PlacementButton({
  children,
  className,
  selected = false,
  selectable = true,
  tooltipContent = false,
  ...props
}: any) {
  if (!!selected) {
    selectable = true;
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => {}}
            variant="ghost"
            size="icon"
            className={cn(
              'w-8 h-8 rounded-md text-zinc-600 transition-all',
              selectable ? 'hover:bg-slate-950 hover:text-white' : '',
              selected ? 'bg-slate-950 text-white' : '',
              className
            )}
            {...props}
          >
            {children}
          </Button>
        </TooltipTrigger>
        {!!tooltipContent && (
          <TooltipContent asChild>
            <p className="text-sm z-[99999999999]">{tooltipContent}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
