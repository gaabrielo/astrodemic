import { Button } from '@/components/ui/primitives/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/primitives/Dropdown';
import { Separator } from '@/components/ui/primitives/Separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/primitives/tooltip';
import { cn } from '@/utils/helpers';
import {
  ChevronDownIcon,
  CopyIcon,
  ForwardIcon,
  LayersIcon,
  LayoutGridIcon,
  PlayIcon,
  Trash2Icon,
} from 'lucide-react';

const playButtonOptions = [
  {
    label: 'Salvar alterações',
    icon: <ForwardIcon className="w-4 h-4" />,
  },
  {
    label: 'Duplicar',
    icon: <CopyIcon className="w-4 h-4" />,
    disabled: false,
  },
  {
    label: 'Excluir',
    icon: <Trash2Icon className="w-4 h-4" />,
    disabled: false,
    sectionStart: true,
    className: 'text-red-600 hover:text-red-600 hover:opacity-100 opacity-80',
  },
];

const HEADER_PADDING = 'px-3 pb-2 pt-2';
const HEADER_GAP = 'gap-3';

export function Header({
  isLayersOpen,
  setIsLayersOpen,
  isSpritesOpen,
  setIsSpritesOpen,
}: any) {
  return (
    <header
      className={`w-full flex border-b border-zinc-200 bg-white ${HEADER_PADDING} ${HEADER_GAP} items-center`}
    >
      {/* <h1
        style={{
          fontFamily: 'Handwritten',
          fontSize: '1.75rem',
        }}
        className="overflow-hidden text-nowrap font-black leading-9"
      >
        Eduwars: Map maker
      </h1> */}

      <img src="/icon.svg" alt="Eduwars" />

      <div className="flex mr-0 ml-auto">
        <Button
          className="items-center font-normal rounded-r-none text-gray-50 px-3"
          variant="default"
          size="sm"
        >
          <PlayIcon className="w-4 h-4 mr-2" />
          Jogar
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-slate-900 rounded-r-md flex items-center justify-between">
            <div className="w-[1px] h-3/5 bg-slate-600" />
            <ChevronDownIcon className="w-4 h-4 text-gray-50 mx-2" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {playButtonOptions.map((btn) => (
              <>
                {!!btn.sectionStart && <DropdownMenuSeparator />}
                <DropdownMenuItem
                  disabled={btn.disabled ?? false}
                  className={cn(
                    'w-52 flex items-center gap-3 cursor-pointer transition-all text-slate-700 hover:text-slate-950',
                    btn.className ?? ''
                  )}
                >
                  {btn.icon}
                  {btn.label}
                </DropdownMenuItem>
              </>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* <div
        className={`border-r border-l border-zinc-200 flex h-full items-center px-2 mx-2 ${HEADER_GAP}`}
      >
        {placementButtons.map((pb) => (
          <LabeledButton
            icon={pb.icon}
            label={pb.label}
            name={pb.value}
            selected={selectedPlacementOption === pb.value}
            onClick={() => setSelectedPlacementOption(pb.value)}
            key={pb.value}
          />
        ))}
      </div>

      <BoardOptions boardSize={boardSize} setBoardSize={setBoardSize} />
      <LabeledButton
        icon={<ImagePlusIcon />}
        label="Carregar imagem"
        onClick={() => {}}
        variant="ghost"
      />
      <LabeledButton
        icon={isGridVisible ? <EyeOffIcon /> : <EyeIcon />}
        onClick={() => setIsGridVisible((prev) => !prev)}
        label={`${isGridVisible ? 'Esconder' : 'Mostrar'} grid`}
        variant="ghost"
      /> */}

      <LabeledButton
        onClick={() => setIsLayersOpen((prev: boolean) => !prev)}
        selected={isLayersOpen}
        // label={`${isLayersOpen ? 'Esconder' : 'Mostrar'} camadas`}
        label={`Camadas`}
        variant="outline"
        // showLabel
        size="sm"
        className="px-2"
      >
        <LayersIcon className="w-5 h-5" />
        Camadas
      </LabeledButton>

      <LabeledButton
        // icon={}
        onClick={() => setIsSpritesOpen((prev: boolean) => !prev)}
        selected={isSpritesOpen}
        label={`Sprites`}
        variant="outline"
        // showLabel
        size="sm"
        className="px-2"
      >
        <LayoutGridIcon className="w-5 h-5" />
        Sprites
      </LabeledButton>
    </header>
  );
}

function LabeledButton({
  icon,
  label = false,
  showLabel = false,
  selected = false,
  className,
  variant = 'ghost',
  children,
  ...rest
}: any) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center gap-1">
            <Button
              variant={variant}
              size="icon"
              {...rest}
              className={cn(
                'text-zinc-700 flex items-center gap-2',
                selected ? `bg-accent text-slate-900` : '',
                className
              )}
            >
              {children}
            </Button>
            {!!showLabel && (
              <span className="text-[10px] text-neutral-500">{label}</span>
            )}
          </div>
        </TooltipTrigger>
        {!!label && (
          <TooltipContent asChild>
            <p className="text-sm">{label}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
