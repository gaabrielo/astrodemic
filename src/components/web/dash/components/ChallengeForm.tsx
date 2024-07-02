import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/primitives/Input';
import { Separator } from '@/components/ui/primitives/Separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export function ChallengeForm({ handleDelete, form }: any) {
  const [hasTip, setHasTip] = useState(false);

  const formValues = form?.getValues();
  console.log('🚀 ~ ChallengeForm ~ form?.getValues():', form?.getValues());

  return (
    <Card>
      <CardContent className="grid gap-4 pt-6">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="w-full grid items-center grid-cols-4">
                <FormLabel className="col-span-1">Enunciado</FormLabel>
                <FormControl className="col-span-3">
                  <Textarea
                    {...field}
                    className="min-h-[100px]"
                    placeholder="Digite o enunciado do desafio"
                  />
                </FormControl>
                {/* <FormDescription>Este será seu nome de usuário</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mt-4">
          {['A', 'B', 'C', 'D'].map((ca) => (
            <ChallengeAnswerInputs label={ca} form={form} />
          ))}
        </div>

        <div className="flex items-center gap-2 mt-6 space-y-2">
          <FormField
            control={form.control}
            name="has_hint"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Switch
                    {...field}
                    id="enable-hint"
                    onCheckedChange={(val) => {
                      setHasTip(val);
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormLabel>Habilitar dica</FormLabel>
                {/* <FormDescription>Este será seu nome de usuário</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="hint_description"
          render={({ field }) => (
            <>
              {hasTip && (
                <FormItem className="flex items-center gap-2">
                  <FormControl className="space-y-2 pt-2">
                    <Textarea
                      {...field}
                      className="min-h-[100px]"
                      placeholder="Digite a dica do desafio"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            </>
          )}
        />

        <Separator className="mt-0" />

        <div className="space-y-2">
          <footer className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 ml-auto mr-0"
              onClick={() => handleDelete()}
            >
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Excluir
              </span>
            </Button>
            <Button
              size="sm"
              className="h-7 gap-1"
              type="submit"
              disabled={
                formValues?.correct_answer === '' ||
                formValues?.alternative_A.trim() === '' ||
                formValues?.alternative_B.trim() === '' ||
                formValues?.alternative_C.trim() === '' ||
                formValues?.alternative_D.trim() === '' ||
                formValues?.text.trim() === ''
              }
            >
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Adicionar desafio
              </span>
            </Button>
          </footer>
        </div>
      </CardContent>
    </Card>
  );
}

function ChallengeAnswerInputs({ label, form }: any) {
  return (
    <div className="flex flex-col gap-2">
      <FormField
        control={form.control}
        name={`alternative_${label}`}
        render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormLabel className="text-base">{label}.</FormLabel>
            <FormControl>
              <Input {...field} placeholder={`Digite a alternativa ${label}`} />
            </FormControl>
            {/* <FormDescription>Este será seu nome de usuário</FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="correct_answer"
        render={({ field }) => (
          <FormItem className="flex flex-row-reverse items-center my-0 text-right w-full gap-2">
            <FormLabel className="mt-1 font-normal text-sm cursor-pointer">
              Alternativa correta
            </FormLabel>
            <FormControl>
              <Checkbox
                {...field}
                checked={field.value === label}
                onCheckedChange={(val) => {
                  console.log('🚀 ~ ChallengeAnswerInputs ~ val:', val);
                  field.onChange(label);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
