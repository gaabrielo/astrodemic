import {
  CSSProperties,
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CELL_SIZE, SPRITE_SHEET_SRC } from '@/utils/consts';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { spriteSheetImageAtom } from '@/atoms/spriteSheetImageAtom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/primitives/tooltip';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { currentDraggedSpriteAtom } from '@/atoms/web/currentDraggedSpriteAtom';

const SpriteAsideItem = forwardRef(
  (
    {
      spriteSettings,
      spriteKey = null,
      isDragging = false,
      spriteScale = 1,
      defaultSize = null,
      ...props
    }: any,
    ref
  ) => {
    const [spriteImage, setSpriteImage] = useState<null | ReactNode>();
    console.log('🚀 ~ spriteImage:', spriteImage);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { xy, area = [1, 1] } = spriteSettings;

    const spriteSheetImg = useRecoilValue(spriteSheetImageAtom)!;

    const imageWidth =
      (defaultSize ? defaultSize : area[0] * CELL_SIZE) * spriteScale;
    const imageHeight =
      (defaultSize ? defaultSize : area[1] * CELL_SIZE) * spriteScale;

    useEffect(() => {
      if (canvasRef.current && spriteSheetImg) {
        const canvasEl = canvasRef.current!;
        const ctx = canvasEl.getContext('2d')!;

        ctx.imageSmoothingEnabled = false;

        // Clear out anything in the canvas tag
        if (canvasEl) ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

        const tileSheetX = Number(xy.split('x')[0]);
        const tileSheetY = Number(xy.split('x')[1]);

        ctx.drawImage(
          spriteSheetImg,
          tileSheetX * CELL_SIZE,
          tileSheetY * CELL_SIZE,
          CELL_SIZE * area[0],
          CELL_SIZE * area[1],
          0,
          0,
          imageWidth,
          imageHeight
        );

        var spriteImg = canvasEl
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream');

        setSpriteImage(spriteImg);
      }
    }, [spriteSettings, spriteSheetImg]);

    const setDraggedSprite = useSetRecoilState(currentDraggedSpriteAtom);

    if (isDragging) {
      const spriteSettingsCopy = Object.assign({}, spriteSettings);
      spriteSettingsCopy.image = spriteImage;

      setDraggedSprite(spriteSettingsCopy);
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              draggable
              className={
                isDragging
                  ? 'p-0 text-center mx-auto leading-none'
                  : `text-center p-2 hover:bg-zinc-100 rounded-sm flex flex-col items-center gap-1`
              }
              style={{ imageRendering: 'pixelated' }}
              ref={ref}
              {...props}
            >
              <canvas
                width={imageWidth}
                height={imageHeight}
                ref={canvasRef}
                className="mx-auto z-10"
              />
            </button>
          </TooltipTrigger>
          {!isDragging && (
            <TooltipContent side="bottom" className="uppercase z-50">
              {spriteKey?.replaceAll('_', ' ').toLowerCase()}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  }
);

export default function DraggableSprite({ id, spriteSettings, ...props }: any) {
  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useDraggable({
      id,
      data: {
        type: 'type1',
      },
    });

  // const style: CSSProperties = {
  //   transform: CSS.Transform.toString(transform),
  // };

  return (
    <SpriteAsideItem
      ref={setNodeRef}
      spriteSettings={spriteSettings}
      isDragging={isDragging}
      {...attributes}
      {...listeners}
      {...props}
    />
  );
}
