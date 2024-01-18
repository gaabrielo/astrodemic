import RenderLevel from '@/components/level-layout/RenderLevel';
import { SPRITE_SHEET_SRC } from '@/config/consts';
import { useEffect, useState } from 'react';

export default function App() {
  const [spriteSheetImage, setSpriteSheetImage] =
    useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const image = new Image();
    image.src = SPRITE_SHEET_SRC;
    image.onload = () => {
      setSpriteSheetImage(image);
    };
  }, []);

  if (!spriteSheetImage) return null;

  return <RenderLevel spriteSheetImage={spriteSheetImage} />;
}
