import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/primitives/Button';
import { Input } from '@/components/ui/primitives/Input';
import { Separator } from '@/components/ui/primitives/Separator';

import { Textarea } from '@/components/ui/textarea';
import { ChallengeForm } from '@/components/web/dash/components/ChallengeForm';
import { createClass, createClassChallenges } from '@/services/dash/class';
import { Pencil1Icon, PlusCircledIcon, TrashIcon } from '@radix-ui/react-icons';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Deve possuir 2 caracteres no mínimo.',
  }),
  ytb_link: z.string(),
  description: z.string(),

  text: z.string(),
  has_hint: z.boolean(),
  hint_description: z.string(),
  alternative_A: z.string(),
  alternative_B: z.string(),
  alternative_C: z.string(),
  alternative_D: z.string(),
  correct_answer: z.string().min(1),
});

export function LevelClassForm({
  levelId,
  defaultData,
  setDefaultData,
  id,
}: any) {
  console.log('🚀 ~ defaultData:', defaultData);

  const [isChallengeFormActive, setIsChallengeFormActive] = useState<
    null | boolean
  >(null);

  const [alternatives, setAlternatives] = useState([]);

  useEffect(() => {
    if (defaultData?.alternatives) setAlternatives(defaultData?.alternatives);
    else setAlternatives([]);
  }, [defaultData]);

  const [defaultValues, setDefaultValues] = useState(defaultData);

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    setDefaultValues(defaultData);
    form.reset(defaultData);
  }, [defaultData]);

  function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();

    const cId = id == null ? uuidv4() : id;
    const challengeFields = { ...values };
    // Default values
    const challengeFieldsDefault: any = { ...defaultData };
    // challengeFieldsDefault.id = cId;

    if (!_.isEqual(challengeFields, challengeFieldsDefault)) {
      setAlternatives((prev) => {
        const aux: any = [...prev];
        aux.push(challengeFields);
        return aux;
      });

      // form.resetField('text');
      // form.resetField('has_hint');
      // form.resetField('hint_description');
      // form.resetField('alternative_A');
      // form.resetField('alternative_B');
      // form.resetField('alternative_C');
      // form.resetField('alternative_D');
      // form.resetField('correct_answer');
    }
  }

  function handleNewChallenge() {
    setIsChallengeFormActive((prev: boolean | null) => !prev);
  }

  async function handleSaveClass() {
    const { ytb_link, description, title } = form.getValues();

    if (!levelId) return;

    const crtRes = await createClass({
      ytb_link,
      description,
      title,
      level_id: levelId,
    });

    if (!crtRes.error) {
      const formattedAlternatives = alternatives.map(
        ({
          text,
          has_hint,
          hint_description,
          alternative_A,
          alternative_B,
          alternative_C,
          alternative_D,
          correct_answer,
        }) => ({
          text,
          has_hint,
          hint_description,
          correct_answer,
          alternatives: [
            alternative_A,
            alternative_B,
            alternative_C,
            alternative_D,
          ],
          class_id: crtRes.data[0].id,
        })
      );

      await createClassChallenges(formattedAlternatives);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full bg-transparent overflow-hidden gap-0 flex flex-col shrink h-full px-1"
      >
        {/* <div className="bg-white shrink rounded-t-lg shadow-lg overflow-y-scroll overflow-hidden flex-1 scrollbar"> */}
        <header className="flex items-center">
          <p className="text-lg font-medium text-slate-700">
            {id() ? <>Aula {id()}</> : 'Cadastrar videoaula'}
          </p>
          {/* <Button
            type="button"
            variant="ghost"
            size={'sm'}
            className="mr-1 ml-auto"
            onClick={() => {
              // setDefaultData(null);
              form.reset();
            }}
          >
            Cancelar
          </Button>
          <Button type="button" size={'sm'} onClick={handleSaveClass}>
            Salvar
          </Button> */}
        </header>

        <Separator className="mt-2" />
        <div className="flex flex-col gap-6 py-4 px-0">
          {/* <div className="space-y-6 grid grid-cols-3"> */}
          <FormField
            control={form.control}
            name="ytb_link"
            render={({ field }) => (
              <FormItem className="grid gap-6 items-center w-full grid-cols-4">
                <FormLabel className="col-span-1 w-full">
                  Link do Youtube
                </FormLabel>
                <FormControl
                  defaultValue={defaultData?.ytb_link}
                  className="col-span-3"
                >
                  <Input placeholder="Cole o link do vídeo" {...field} />
                </FormControl>
                {/* <FormDescription>Este será seu nome de usuário</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="grid w-full gap-6 items-center grid-cols-4">
                <FormLabel className="col-span-1 w-full">
                  Título da Aula
                </FormLabel>
                <FormControl
                  defaultValue={defaultData?.title}
                  className="col-span-3"
                >
                  <Input placeholder="Digite o título da aula" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="grid w-full gap-6 items-center grid-cols-4">
                <FormLabel className="col-span-1">Descrição</FormLabel>
                <FormControl
                  defaultValue={defaultData?.description}
                  className="col-span-3"
                >
                  <Textarea
                    {...field}
                    className="min-h-[100px]"
                    placeholder="Digite uma breve descrição, dê instruções e forneça informações sobre o conteúdo"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* </div> */}

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-slate-700">Desafios</h3>
              <p className="text-sm text-neutral-500 mt-1">
                Os desafios serão apresentados sequencialmente ao jogador
              </p>
            </div>

            <Button
              size="sm"
              className="h-7 gap-1"
              onClick={() => handleNewChallenge()}
              disabled={!!isChallengeFormActive}
            >
              <PlusCircledIcon className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Adicionar desafio
              </span>
            </Button>
          </div>

          {!!isChallengeFormActive && (
            <div className="space-y-4">
              <ChallengeForm
                handleDelete={() => setIsChallengeFormActive(null)}
                form={form}
              />
            </div>
          )}

          <div className="space-y-4">
            <Accordion collapsible type="single">
              {alternatives.map((c: any) => (
                <ChallengeRow data={c} key={c.id} />
              ))}
            </Accordion>
          </div>
        </div>
        {/* </div> */}

        <footer className="rounded-b-lg w-full sticky bottom-0 right-0 bg-transparent z-10 bg-white">
          {alternatives.length === 0 && <Separator className="mb-4" />}
          <div className="w-full flex items-center gap-1 ">
            {defaultData?.id !== null && (
              <Button
                variant="ghost"
                className="text-red-400 hover:text-red-500 hover:bg-red-50 transition-all gap-1 flex items-center px-2"
              >
                <TrashIcon className="w-4 h-4" />
                <span>Excluir aula</span>
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              className="mr-1 ml-auto"
              onClick={() => {
                // setDefaultData(null);
                form.reset();
              }}
            >
              Cancelar
            </Button>
            <Button type="button" onClick={handleSaveClass}>
              Salvar
            </Button>
          </div>
        </footer>
      </form>
    </Form>
  );
}

function ChallengeRow({ data, ...props }: any) {
  return (
    <AccordionItem {...props} value={data.id}>
      <AccordionTrigger className="gap-1 justify-start">
        <span className="text-left font-normal">{data.text}</span>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-2">
          {['A', 'B', 'C', 'D'].map((alt) => {
            return (
              <div className="flex items-center gap-2">
                <Checkbox disabled checked={alt === data.correct_answer} />
                <span>{data[`alternative_${alt}`]}</span>
              </div>
            );
          })}
        </div>

        {data.has_hint && <p className="mt-4">Dica: {data.hint_description}</p>}

        <div className="flex items-center gap-1 justify-end mt-3">
          <Button
            size="sm"
            variant="outline"
            className="text-slate-700"
            type="button"
          >
            <Pencil1Icon className="w-4 h-4 mr-1 text-slate-500" />
            Editar
          </Button>
          <Button size="sm" variant="destructive" type="button">
            Excluir
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
