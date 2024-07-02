import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/primitives/Separator';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/utils/helpers';
import clsx from 'clsx';
import { format } from 'date-fns';

export function JourneyCreatorCard({
  onClick,
  data,
  isLoading = false,
  className,
  ...props
}: any) {
  if (isLoading || !data) {
    return (
      <Card>
        <CardContent className="p-0">
          <Skeleton className="w-full h-36" />

          <div className="py-3 px-4">
            <Skeleton className="w-[80%] h-4 rounded-sm" />
            <Skeleton className="w-[60%] h-3 mt-2 rounded-sm" />
          </div>

          <Separator />

          <div className="flex py-3 px-4">
            <div className="flex-1">
              <Skeleton className="w-[80%] h-4 rounded-sm" />
              <Skeleton className="w-[80%] h-4 mt-2 rounded-sm" />
            </div>
            <div className="flex-1">
              <Skeleton className="w-[80%] h-4 rounded-sm" />
              <Skeleton className="w-[80%] h-4 mt-2 rounded-sm" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        'overflow-hidden cursor-pointer group flex flex-col justify-between',
        className
      )}
      onClick={onClick}
      {...props}
    >
      <CardHeader className="p-0">
        <img
          alt="Project"
          className="aspect-video object-cover group-hover:scale-110"
          height="225"
          src="/logo512.png"
          width="400"
        />
      </CardHeader>
      <CardContent className="w-full p-0 flex flex-col flex-shrink flex-1">
        <div className="py-3 px-4 flex-shrink flex-1">
          <h1 className="text-xl font-bold mb-2 leading-none text-gray-950">
            {data['name']}
          </h1>

          <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-col">
            <span className="leading-0 text-slate-700">
              {data?.class?.length > 1
                ? `${data?.class?.length} aulas cadastradas`
                : data?.class?.length === 0
                ? 'Nenhuma aula cadastrada (Cadastre agora)'
                : '1 aula cadastrada'}
            </span>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 py-3 px-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-col">
            CRIADO
            <span className="leading-0 text-gray-950">
              {format(new Date(data['created_at']), 'dd/MM/yy')}
            </span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-col">
            ATUALIZADO
            <span className="leading-0 text-gray-950">
              {format(new Date(data['updated_at']), 'dd/MM/yy')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
