import { CELL_SIZE } from '@/config/consts';
import React, { useEffect, useRef } from 'react';

interface Props {
  frameCoordinate: string;
  size?: number;
  image: HTMLImageElement;
}

function Sprite({ image, frameCoordinate, size = 16 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef) return;

    const canvasEl = canvasRef.current!;
    const ctx = canvasEl.getContext('2d')!;

    // Clear out anything in the canvas tag
    if (canvasEl) ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    const tileSheetX = Number(frameCoordinate.split('x')[0]);
    const tileSheetY = Number(frameCoordinate.split('x')[1]);

    ctx.drawImage(
      image,
      tileSheetX * CELL_SIZE,
      tileSheetY * CELL_SIZE,
      size,
      size,
      0,
      0,
      size,
      size
    );
  }, [frameCoordinate]);

  return <canvas width={size} height={size} ref={canvasRef} />;
}

export default React.memo(Sprite);
