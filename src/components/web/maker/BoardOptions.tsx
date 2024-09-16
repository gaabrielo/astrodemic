import { Label } from '@/components/ui/primitives/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/primitives/popover';
import { Button } from '@/components/ui/primitives/Button';
import { Input } from '@/components/ui/primitives/Input';
import { cn } from '@/utils/helpers';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/primitives/Separator';

export function BoardOptions({ boardSize, setBoardSize, shadow = true }: any) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className={`items-center font-normal leading-none text-zinc-600 hover:text-slate-950 transition-all ${
            !shadow && 'shadow-none'
          }`}
          size={'sm'}
        >
          {boardSize[0]} x {boardSize[1]}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-80 p-1 pb-2 mt-[0.315rem]"
        side="bottom"
        align="center"
      >
        <p
          className={
            'text-neutral-500 uppercase text-sm font-normal px-2 py-1.5'
          }
        >
          Tamanho do quadro
        </p>

        <Separator />

        <div className="grid gap-2 mt-4 mx-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="columns" className="text-slate-700">
              Colunas
            </Label>
            <InputNumber
              className="col-span-2"
              id="columns"
              defaultValue={boardSize[0]}
              setValue={(newVal: number) =>
                setBoardSize((prev: any) => [newVal, prev[1]])
              }
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="lines" className="text-slate-700">
              Linhas
            </Label>
            <InputNumber
              className="col-span-2"
              id="lines"
              defaultValue={boardSize[1]}
              setValue={(newVal: number) =>
                setBoardSize((prev: any) => [prev[0], newVal])
              }
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function InputNumber({
  className,
  onChange = () => {},
  defaultValue = 0,
  setValue = () => {},
  ...rest
}: any) {
  const [customValue, setCustomValue] = useState(defaultValue);

  function customOnChange(e: any) {
    if (isNaN(Number(e.target.value))) return;
    setCustomValue(Number(e.target.value));
    onChange(e);
  }

  useEffect(() => {
    setValue(customValue);
  }, [customValue]);

  return (
    <div className={cn('grid grid-cols-5 w-full col-span-2 gap-1', className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="col-span-1 h-full w-full"
        onClick={() => setCustomValue((prev: number) => prev - 1)}
      >
        <MinusIcon className="h-4 w-4 text-zinc-700" />
      </Button>

      <Input
        className="col-span-3 text-center"
        onChange={customOnChange}
        value={customValue}
        {...rest}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="col-span-1 h-full w-full"
        onClick={() => setCustomValue((prev: number) => prev + 1)}
      >
        <PlusIcon className="h-4 w-4 text-zinc-700" />
      </Button>
    </div>
  );
}
