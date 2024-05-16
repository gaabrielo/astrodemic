import { Button } from '@/components/ui/primitives/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/primitives/tooltip';
import { cn } from '@/utils/helpers';

export function LabeledButton({
  icon,
  showLabel = false,
  labelContent = false,
  showTooltip = false,
  tooltipContent = "Use 'tooltipContent' props",
  size = 'icon',
  selected = false,
  className,
  variant = 'ghost',
  children,
  ...rest
}: any) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center gap-1">
            <Button
              variant={variant}
              size={size}
              className={cn(
                'text-zinc-600 flex items-center gap-2 transition-all',
                selected ? `bg-accent text-slate-900` : '',
                className
              )}
              {...rest}
            >
              {children}
            </Button>
            {!!showLabel && (
              <span className="text-[10px] text-neutral-500">
                {labelContent}
              </span>
            )}
          </div>
        </TooltipTrigger>
        {!!showTooltip && (
          <TooltipContent asChild>
            <p className="text-sm">{tooltipContent}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
