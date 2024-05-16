import { Button } from '@/components/ui/primitives/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/primitives/tabs';
import {
  ArrowUpRightIcon,
  CalendarIcon,
  ClockIcon,
  LinkIcon,
  PlusCircleIcon,
  SquarePenIcon,
  TrashIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import NewClassModal from '@/components/ui/dash/components/NewClassModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/primitives/Dropdown';
import { Avatar, AvatarFallback } from '@/components/ui/primitives/avatar';
import { Input } from '@/components/ui/primitives/Input';
import { Label } from '@/components/ui/primitives/label';
import { EditableTextContainer } from '@/components/ui/shared/EditableTextContainer';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/primitives/Separator';
import { createLevel, getLevel, getLevels } from '@/services/dash/journey';
import NewClassSheet from '@/components/ui/dash/components/NewClassSheet';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/primitives/Select';
import { JourneySettings } from '@/components/ui/dash/pages/JourneySettings';

export function DashPageJourney() {
  const router = useRouter();
  const pathname = usePathname();

  const [journeyList, setJourneyList] = useState([]);
  const [selectedJourney, setSelectedJourney] = useState<any>(null);

  useEffect(() => {
    async function fetchLevels() {
      const data = await getLevels();
      if (!data.error) setJourneyList(data.data);
    }

    fetchLevels();
  }, []);

  if (selectedJourney) {
    return (
      <>
        <Tabs defaultValue="videos">
          <TabsList className="flex">
            <TabsTrigger value="videos" className="flex-1">
              Material didático
            </TabsTrigger>
            <TabsTrigger value="students" className="flex-1">
              Alunos
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos">
            <Card>
              <CardHeader className="flex justify-between items-center flex-row">
                <div className="w-fit">
                  <CardTitle>Video aulas (3)</CardTitle>
                  <CardDescription className="mt-1.5">
                    Defina o conteúdo do jogo. Máx. 10
                  </CardDescription>
                </div>

                {/* <NewClassModal /> */}
                <NewClassSheet />
              </CardHeader>
              <CardContent className="pl-8 mt-4">
                <div className="relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20 grid gap-14">
                  {[...Array(7)].map((_, key: number) => {
                    return <ClassRow key={key} idx={key} />;
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader className="flex flex-col">
                <CardTitle>Alunos</CardTitle>
                <CardDescription>31 alunos cadastrados</CardDescription>
              </CardHeader>
              <CardContent className="pl-6 mt-2">
                <Input
                  placeholder="Buscar aluno..."
                  className="mb-2 max-w-[50%]"
                />

                <Card className="overflow-hidden shadow-none">
                  <table className="w-full table-auto">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left"></th>
                        <th className="px-4 py-3 text-left font-medium text-sm">
                          Username
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-sm">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-sm">
                          Data de matrícula
                        </th>
                        <th className="px-4 py-3 text-left"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="pl-4 py-3 w-fit">
                          <Avatar>
                            <AvatarFallback>US</AvatarFallback>
                          </Avatar>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            {/* <div className="flex-shrink-0 h-10 w-10 bg-gray-300 rounded-full mr-4" /> */}
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                João Silva
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                          joao.silva@example.com
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                          2022-03-15
                        </td>
                        <td className="px-4 py-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                className="rounded-full"
                                size="icon"
                                variant="ghost"
                              >
                                <EllipsisIcon />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Remover</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <JourneySettings />
          </TabsContent>
        </Tabs>
      </>
    );
  }

  // LISTAGEM DE SEQUENCIAS DIDATICAS
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl w-full mx-auto">
      <Card
        className="overflow-hidden cursor-pointer"
        onClick={async () => {
          // setAwaitMessageCreatingLevel('Configurando...');
          const { error, data } = await createLevel();

          console.log('🚀 ~ onClick={ ~ data:', data);
          if (!error && !!data) {
            // setAwaitMessageCreatingLevel('Redirecionando...');
            setSelectedJourney(data[0]);
          }
        }}
      >
        <CardContent className="flex h-full flex-col items-center justify-center p-3 gap-2 text-gray-500 bg-zinc-100 hover:bg-zinc-100/80 hover:text-gray-700 transition-all">
          <PlusCircleIcon />
          <p className="w-full text-center text-sm font-medium">Criar novo</p>
        </CardContent>
      </Card>

      {journeyList.map((jl) => {
        return (
          <CardWithImage
            key={jl.id}
            data={jl}
            onClick={() => setSelectedJourney(jl)}
          />
        );
      })}
    </div>
  );
}

function CardWithImage({ onClick, data }: any) {
  return (
    <Card className="overflow-hidden cursor-pointer group" onClick={onClick}>
      <CardHeader className="p-0">
        <img
          alt="Project"
          className="aspect-video object-cover group-hover:scale-110"
          height="225"
          src="/logo512.png"
          width="400"
        />
      </CardHeader>
      <CardContent className="py-3 px-4">
        <div className="text-xl font-bold mb-1.5">{data['name']}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          <span className="leading-0">
            {format(new Date(data['created_at']), 'dd/MM/yyyy')}
          </span>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-0.5">
          <SquarePenIcon className="w-4 h-4" />
          <span className="leading-0">
            {format(new Date(data['updated_at']), 'dd/MM/yyyy')}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function ClassRow({ idx }: any) {
  return (
    <div className="text-sm relative pl-2">
      <div className="aspect-square w-3 bg-green-500 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />

      <button className="text-left grid gap-4 mb-4 group">
        <header className="flex flex-col">
          <p className="font-medium text-gray-900">Aula {idx + 1}</p>
          <p className="text-base group-hover:underline transition-all text-gray-500 group-hover:text-gray-900">
            Desbravando o React
          </p>
        </header>

        <div className="text-gray-500 group-hover:text-gray-900 transition-all dark:text-gray-400">
          Aprenda os fundamentos do React, uma das principais bibliotecas
          JavaScript para desenvolvimento de interfaces de usuário.
        </div>
      </button>

      <div className="flex gap-1 text-gray-500">
        {/* <div className="flex items-center gap-1 text-sm dark:text-gray-400">
          <ClockIcon className="w-4 h-4" />
          <span>45 min</span>
        </div>

        <div className="flex items-center gap-1 text-sm dark:text-gray-400">
          <LinkIcon className="w-4 h-4" />
          <a
            href="https://www.youtube.com"
            target="_blank"
            className="hover:text-gray-900 hover:underline transition-all"
          >
            https://www.youtube.com/
          </a>
        </div> */}

        <span className="px-3 py-0.5 rounded-full border border-gray-300 text-xs leading-0 bg-gray-100">
          Active
        </span>

        <span className="px-3 py-0.5 rounded-full border border-gray-300 text-xs leading-0 flex items-center gap-1  bg-gray-100">
          <span>45 min</span>
          <ClockIcon className="w-3 h-3" />
        </span>

        <a href="https://www.youtube.com" target="_blank">
          <span className="px-3 py-0.5 rounded-full border border-gray-300 text-xs leading-0 flex items-center gap-1 hover:text-gray-900 transition-all hover:bg-gray-100">
            <span>https://www.youtube.com/</span>
            <ArrowUpRightIcon className="w-4 h-4" />
          </span>
        </a>

        <span className="px-3 py-0.5 rounded-full border border-gray-300 text-xs leading-0 flex items-center gap-1 hover:text-gray-900 transition-all cursor-pointer hover:bg-gray-100">
          Editar <ArrowUpRightIcon className="w-4 h-4" />
        </span>

        {/* <span className="px-0.5 py-0.5 rounded-full border border-gray-300 text-xs leading-0 flex items-center gap-1 hover:text-gray-900 transition-all cursor-pointer">
          <EllipsisIcon />
        </span> */}
      </div>
    </div>
  );
}

function EllipsisIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-ellipsis h-4 w-4"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}
