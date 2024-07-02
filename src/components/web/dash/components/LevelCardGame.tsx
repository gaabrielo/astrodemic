import { Button } from '@/components/ui/primitives/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/primitives/Dropdown';
import { EllipsisIcon } from '@/components/ui/shared/EllipsisIcon';
import { Skeleton } from '@/components/ui/skeleton';
import { PlayIcon, TrashIcon } from '@radix-ui/react-icons';
import { BadgeInfoIcon, User2Icon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export function LevelCardGame({ data, isLoading = false }: any) {
  const router = useRouter();
  if (!data || isLoading) {
    return (
      <div className="w-full overflow-hidden rounded-xl min-h-40 border flex">
        <Skeleton className="w-2/5" />

        <div className="w-3/5 py-2 px-3 flex flex-col justify-between">
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-7 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl min-h-40 border flex">
      <Image
        alt="game image"
        src="/logo512.png"
        width={512}
        height={512}
        className="h-full w-[40%] object-cover min-h-40"
      />
      <div className="w-[60%] px-3 gap-3 font-semibold py-2 flex flex-col justify-between">
        <h1>{data.name}</h1>

        <div className="w-full flex gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6 rounded-full self-center"
              >
                <EllipsisIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem>
                Informações do mapa
                <BadgeInfoIcon className="w-5 h-5 ml-4 stroke-[1.75]" />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  router.push('/u/' + data.user_id);
                }}
              >
                Perfil do criador
                <User2Icon className="w-5 h-5 ml-4 stroke-[1.75]" />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">
                Excluir
                <TrashIcon className="w-5 h-5 ml-4 stroke-[1.75]" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="w-full gap-1 font-normal flex-1"
            variant={'secondary'}
            size={'sm'}
          >
            Jogar
            <PlayIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
