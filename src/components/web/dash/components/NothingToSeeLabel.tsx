import { cn } from '@/utils/helpers';

export function NothingToSeeLabel({
  className,
  label = 'Nada para ver ainda',
}: any) {
  return (
    <span className={cn('text-neutral-500/60 text-sm', className)}>
      {label}
    </span>
  );
}
