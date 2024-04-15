'use client';

import { spriteSheetImageAtom } from '@/atoms/spriteSheetImageAtom';
import { BoardOptions } from '@/components/ui/maker/BoardOptions';
import { LayersAside } from '@/components/ui/maker/LayersAside';
import { Level } from '@/components/ui/maker/Level';
import { SpritesAside } from '@/components/ui/maker/SpritesAside';
import { Button } from '@/components/ui/primitives/Button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/primitives/Resizable';
import { Separator } from '@/components/ui/primitives/Separator';
import { Slider } from '@/components/ui/primitives/Slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { SPRITE_SHEET_SRC } from '@/utils/consts';
import { cn } from '@/utils/helpers';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import {
  BoxSelectIcon,
  DoorOpenIcon,
  EyeIcon,
  EyeOffIcon,
  LandPlotIcon,
  PanelRightIcon,
  SquareIcon,
  DownloadIcon,
  MoonIcon,
  SunDimIcon,
  PlayIcon,
  SaveIcon,
  SaveAllIcon,
  ArrowDownToLineIcon,
  ImageUpIcon,
  FileImageIcon,
  ImagePlusIcon,
  MousePointer2Icon,
  MousePointerIcon,
  PaintbrushIcon,
  BrushIcon,
  LayoutGridIcon,
  LayersIcon,
  Layers2Icon,
  Layers3Icon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
// import { Space } from 'react-zoomable-ui';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useRecoilState } from 'recoil';

const HEADER_PADDING = 'p-2';
const HEADER_GAP = 'gap-2';

const theme = {
  dark: {
    asideBg: 'bg-zinc-800',
    mainBg: 'bg-zinc-950',
    text: 'text-gray-50',
  },
  light: {
    asideBg: 'bg-white',
    mainBg: 'bg-zinc-100',
    text: 'text-zinc-950',
  },
};

const placementButtons = [
  {
    label: 'Cursor',
    icon: <MousePointerIcon />,
    value: -1,
  },
  {
    label: 'Pintar área',
    icon: <BrushIcon />,
    value: 1,
  },
  // {
  //   label: 'Posição inicial do herói',
  //   icon: <LandPlotIcon />,
  //   value: 2,
  // },
  // {
  //   label: 'Saída (conecta com outro mapa)',
  //   icon: <DoorOpenIcon />,
  //   value: 3,
  // },
  {
    label: 'Colisão',
    icon: <SquareIcon />,
    value: 0,
  },
];

export default function MapMakerPage() {
  const [darkMode, setDarkMode] = useState<'dark' | 'light'>('light');
  const [levelImgScale, setLevelImgScale] = useState([1]);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isSpritesOpen, setIsSpritesOpen] = useState(true);
  const [isLayersOpen, setIsLayersOpen] = useState(true);
  const [selectedPlacementOption, setSelectedPlacementOption] = useState<
    null | number
  >(null);
  const [isGridVisible, setIsGridVisible] = useState(true);

  const [boardSize, setBoardSize] = useState([9, 10]);

  const styles = theme[darkMode];

  const [spriteSheetImage, setSpriteSheetImage] =
    useRecoilState<any>(spriteSheetImageAtom);

  useEffect(() => {
    const image = new Image();
    image.src = SPRITE_SHEET_SRC;
    image.onload = () => {
      setSpriteSheetImage(image);
    };
  }, [setSpriteSheetImage]);

  function handleNewTiles(position: string) {
    if (['left', 'right'].includes(position)) {
      setBoardSize((prev) => [prev[0] + 1, prev[1]]);
    }

    if (['top', 'bottom'].includes(position)) {
      setBoardSize((prev) => [prev[0], prev[1] + 1]);
    }
  }

  return (
    <div
      className="w-full h-screen text-zinc-950"
      style={{ imageRendering: 'pixelated' }}
    >
      <ResizablePanelGroup direction="horizontal" autoSaveId="conditional">
        <ResizablePanel defaultSize={84} id="left" order={1}>
          <main
            className={`flex items-center flex-col justify-center h-full w-full relative ${styles.mainBg}`}
          >
            <header
              className={`w-full flex border-b border-zinc-200 bg-white ${HEADER_PADDING} ${HEADER_GAP} items-center`}
            >
              <h1
                style={{
                  fontFamily: 'Handwritten',
                  fontSize: '2rem',
                }}
              >
                Map maker
              </h1>

              {/* <div
                className={`border-l flex h-full px-${HEADER_GAP} ${
                  'gap-' + HEADER_GAP
                } items-center`}
              >
                <LabeledButton
                  icon={<DownloadIcon />}
                  onClick={() =>
                    setDarkMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
                  }
                />

                <LabeledButton
                  icon={darkMode === 'dark' ? <SunDimIcon /> : <MoonIcon />}
                  onClick={() =>
                    setDarkMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
                  }
                />
              </div> */}

              {/* <Button variant="ghost" className="mr-0 ml-auto text-slate-800">
                <DownloadIcon className="w-5 h-5 mr-2" />
                Salvar na biblioteca
              </Button> */}
              <Button
                className="items-center font-normal mr-0 ml-auto"
                variant="default"
              >
                <PlayIcon className="w-4 h-4 mr-2" />
                Jogar
              </Button>

              {/* <span className="bg-accent rounded-sm px-3 text-sm">
                Map size: {dimensions.width / 16} x {dimensions.height / 16}
              </span> */}

              <div
                className={cn(
                  `border-r border-l border-zinc-200 flex h-full items-center px-2`,
                  HEADER_GAP
                )}
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
                // selected={placementOption === pb.value}
              />
              <LabeledButton
                icon={isGridVisible ? <EyeOffIcon /> : <EyeIcon />}
                onClick={() => setIsGridVisible((prev) => !prev)}
                label={`${isGridVisible ? 'Esconder' : 'Mostrar'} grid`}
                variant="ghost"
              />

              {/* <div className="flex flex-col w-full max-w-32 text-xs gap-2">
                <span>Zoom:</span>
                <div className="flex gap-2">
                  <Slider
                    defaultValue={[1]}
                    max={5}
                    min={1}
                    step={1}
                    className="max-w-32"
                    onValueChange={(value: number[]) => setLevelImgScale(value)}
                  />
                  <span className="text-sm leading-3">{levelImgScale}</span>
                </div>
              </div> */}

              <LabeledButton
                icon={<LayersIcon />}
                onClick={() => setIsLayersOpen((prev: boolean) => !prev)}
                selected={isLayersOpen}
                label={`${isLayersOpen ? 'Esconder' : 'Mostrar'} camadas`}
                variant="ghost"
              />

              <LabeledButton
                icon={<LayoutGridIcon />}
                onClick={() => setIsSpritesOpen((prev: boolean) => !prev)}
                selected={isSpritesOpen}
                label={`${isSpritesOpen ? 'Esconder' : 'Mostrar'} sprites`}
                variant="ghost"
              />
            </header>

            <div className="flex-1 flex items-center w-full">
              <TransformWrapper panning={{ disabled: true }} centerOnInit>
                <TransformComponent
                  contentClass="main"
                  wrapperStyle={{
                    width: '100%',
                    height: '100%',
                  }}
                >
                  {/* <div className="flex-1 flex items-center justify-center w-full h-full mx-auto">
                    </div> */}

                  <Level
                    dimensions={dimensions}
                    setDimensions={setDimensions}
                    levelImgScale={levelImgScale}
                    selectedPlacement={selectedPlacementOption}
                    showGrid={isGridVisible}
                    boardSize={boardSize}
                    setNewTiles={handleNewTiles}
                  />
                </TransformComponent>
              </TransformWrapper>
            </div>
          </main>
        </ResizablePanel>

        {isLayersOpen && (
          <>
            <ResizableHandle withHandle className="z-20" />

            <ResizablePanel minSize={12} maxSize={18} id="center" order={2}>
              <LayersAside />
            </ResizablePanel>
          </>
        )}

        {isSpritesOpen && (
          <>
            <ResizableHandle withHandle={!isLayersOpen} className="z-20" />

            <ResizablePanel minSize={14} maxSize={28} id="right" order={3}>
              <SpritesAside className={`${styles.asideBg}`} />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
}

function LabeledButton({
  icon,
  label = false,
  selected = false,
  className,
  variant = 'ghost',
  ...rest
}: any) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center gap-1">
            <Button
              variant={variant}
              size="icon"
              {...rest}
              className={cn(
                selected ? `bg-accent` : '',
                'text-zinc-700',
                className
              )}
            >
              {icon}
            </Button>
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
