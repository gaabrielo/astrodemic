import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { Input } from '@/components/ui/primitives/Input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircleIcon, TrashIcon } from 'lucide-react';
import { ChallengeForm } from '@/components/ui/dash/components/ChallengeForm';
import { useState } from 'react';
import { Separator } from '@/components/ui/primitives/Separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function NewClassSheet() {
  const [newChallengeForm, setNewChallengeForm] = useState(null);

  function handleNewChallenge() {
    setNewChallengeForm((prev) => !prev);
  }

  return (
    <Sheet key="1">
      <SheetTrigger asChild>
        <Button
          size="sm"
          className="h-7 gap-1"
          // onClick={() => router.push(pathname + '/new-class')}
        >
          <PlusCircleIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Adicionar
          </span>
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-lg w-full overflow-y-scroll bg-transparent p-3 pl-0 overflow-hidden gap-0 flex flex-col">
        <div className="bg-white shrink rounded-t-lg shadow-lg overflow-y-scroll overflow-hidden flex-1 scrollbar">
          <SheetHeader className="p-6 pr-5">
            <SheetTitle>Cadastro de video-aula</SheetTitle>
            <SheetDescription>
              Preencha os campos abaixo para adicionar uma nova vídeo-aula.
            </SheetDescription>
          </SheetHeader>
          <Separator />

          <div className="grid gap-6 py-4 px-6 pr-3.5">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título da Aula</Label>
                <Input id="title" placeholder="Digite o título da aula" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="video-link">Link do Vídeo</Label>
                <Input id="video-link" placeholder="Cole o link do vídeo" />
              </div>
            </div>
            <div className="space-y-2 mb-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                className="min-h-[100px]"
                id="description"
                placeholder="Digite a descrição e instruções da aula"
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Desafios</h3>
                <p className="text-sm text-neutral-500 mt-1">
                  Os desafios serão apresentados sequencialmente ao jogador
                </p>
              </div>

              <Button
                size="sm"
                className="h-7 gap-1"
                onClick={() => handleNewChallenge()}
                disabled={!!newChallengeForm}
              >
                <PlusCircleIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Adicionar desafio
                </span>
              </Button>
            </div>

            {!!newChallengeForm && (
              <div className="space-y-4">
                <ChallengeForm handleDelete={() => setNewChallengeForm(null)} />
              </div>
            )}

            <div className="space-y-4">
              {/* <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Desafios cadastrados</h3>
            </div> */}

              <Accordion collapsible type="single">
                <AccordionItem value="challenge-1">
                  <AccordionTrigger>
                    <div className="flex items-center justify-between">
                      <span>Qual é a capital do Brasil?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox checked />
                        <span>Brasília</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox />
                        <span>Rio de Janeiro</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox />
                        <span>São Paulo</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox />
                        <span>Salvador</span>
                      </div>
                    </div>
                    <p>A capital do Brasil é uma cidade planejada.</p>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        Editar
                      </Button>
                      <Button size="sm" variant="destructive">
                        Excluir
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="challenge-2">
                  <AccordionTrigger>
                    <div className="flex items-center justify-between">
                      <span>Qual é o maior oceano do mundo?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox />
                        <span>Atlântico</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox checked />
                        <span>Pacífico</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox />
                        <span>Índico</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox />
                        <span>Ártico</span>
                      </div>
                    </div>
                    <p>O Oceano Pacífico é o maior oceano do mundo.</p>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        Editar
                      </Button>
                      <Button size="sm" variant="destructive">
                        Excluir
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        <SheetFooter className="rounded-b-lg w-full sticky bottom-0 right-0 bg-transparent z-10 shadow-lg bg-white">
          <div className="w-full">
            <Separator />
            <div className="w-full flex items-center px-6 py-3 gap-1">
              <Button
                variant="ghost"
                className="text-red-400 hover:text-red-600 ml-0 mr-auto gap-1 flex items-center px-2"
              >
                <TrashIcon className="w-4 h-4" />
                <span>Excluir Aula</span>
              </Button>
              <Button variant="ghost" className="px-2">
                Cancelar
              </Button>
              <Button>Salvar</Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
