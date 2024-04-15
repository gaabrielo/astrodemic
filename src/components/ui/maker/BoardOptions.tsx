import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/primitives/Button';
import { Input } from '@/components/ui/primitives/Input';
import { twStyles } from '@/utils/consts';
import { cn } from '@/utils/helpers';
import {
  ChevronDownIcon,
  Grid3X3Icon,
  MessageSquarePlusIcon,
  MinusIcon,
  PenIcon,
  PencilIcon,
  PlusIcon,
  PlusSquareIcon,
  RulerIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export function BoardOptions({ boardSize, setBoardSize }: any) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className="items-center font-normal leading-none"
        >
          {/* <RulerIcon className="mr-2 w-5 h-5" /> */}
          {boardSize[0]} x {boardSize[1]}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80" side="bottom" align="end" asChild>
        <div>
          <p className={twStyles.light.text.title.secondary}>
            Tamanho do quadro
          </p>

          <div className="grid gap-3 mt-3">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="columns">Colunas</Label>
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
              <Label htmlFor="lines">Linhas</Label>
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
