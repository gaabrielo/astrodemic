import { useEffect, useRef } from 'react';
import { CELL_SIZE, SPRITE_SHEET_SRC } from '@/utils/consts';
import { useRecoilValue } from 'recoil';
import { spriteSheetImageAtom } from '@/atoms/spriteSheetImageAtom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const IMAGE_SIZE = 16 * 3;

export function SelectableSprite({ spriteSettings, spriteKey }: any) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { xy, size = 16 } = spriteSettings;

  const spriteSheetImage: any = useRecoilValue(spriteSheetImageAtom);

  useEffect(() => {
    if (canvasRef.current && spriteSheetImage) {
      const canvasEl = canvasRef.current!;
      const ctx = canvasEl.getContext('2d')!;

      ctx.imageSmoothingEnabled = false;

      // Clear out anything in the canvas tag
      if (canvasEl) ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

      const tileSheetX = Number(xy.split('x')[0]);
      const tileSheetY = Number(xy.split('x')[1]);

      ctx.drawImage(
        spriteSheetImage,
        tileSheetX * CELL_SIZE,
        tileSheetY * CELL_SIZE,
        size,
        size,
        0,
        0,
        IMAGE_SIZE,
        IMAGE_SIZE
      );
    }
  }, [spriteSettings, spriteSheetImage]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="text-center p-2 hover:bg-zinc-100 rounded-sm flex flex-col items-center gap-1"
            style={{ imageRendering: 'pixelated' }}
          >
            <div>
              <canvas
                width={IMAGE_SIZE}
                height={IMAGE_SIZE}
                ref={canvasRef}
                className="mx-auto z-10"
              />
            </div>
            {/* <span className="text-xs uppercase text-zinc-500">
        {spriteKey.replaceAll('_', ' ').toLowerCase()}
      </span> */}
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="uppercase z-50">
          {spriteKey.replaceAll('_', ' ').toLowerCase()}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
