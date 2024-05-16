import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/primitives/Input';
import { Separator } from '@/components/ui/primitives/Separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export function ChallengeForm({ handleDelete }) {
  const [hasTip, setHasTip] = useState(false);

  return (
    <Card>
      <CardContent className="grid gap-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="challenge-question">Enunciado</Label>
          <Textarea
            className="min-h-[100px]"
            id="challenge-question"
            placeholder="Digite o enunciado do desafio"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mt-4">
          {['A', 'B', 'C', 'D'].map((ca) => (
            <ChallengeAnswerInput label={ca} />
          ))}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Switch
            id="enable-hint"
            onCheckedChange={(val) => {
              setHasTip(val);
            }}
          />
          <Label htmlFor="enable-hint">Habilitar dica</Label>
        </div>

        {hasTip && (
          <div className="space-y-2 pt-2">
            <Textarea
              className="min-h-[100px]"
              id="challenge-hint"
              placeholder="Digite a dica do desafio"
            />
          </div>
        )}

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
              // onClick={() => handleNewChallenge()}
            >
              {/* <PlusCircleIcon className="h-3.5 w-3.5" /> */}
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

function ChallengeAnswerInput({ label }: any) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={`challenge-option-${label}`}>{label}.</Label>
      <Input
        id={`challenge-option-${label}`}
        placeholder={`Digite a alternativa ${label}`}
      />

      <div className="flex items-center gap-1">
        <Checkbox id={`challenge-option-${label}-correct`} />
        <Label
          htmlFor={`challenge-option-${label}-correct`}
          className="leading-0 text-xs"
        >
          Correta
        </Label>
      </div>
    </div>
  );
}
