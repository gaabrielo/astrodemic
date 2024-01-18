import Sprite from '@/components/object-graphics/Sprite';
import styles from './RenderLevel.module.css';
import { CELL_SIZE } from '@/config/consts';
import { CSSProperties } from 'react';

interface Props {
  spriteSheetImage: HTMLImageElement;
}

export default function RenderLevel({ spriteSheetImage }: Props) {
  const level = {
    placements: [
      // Level 0
      // { id: 0, x: 0, y: 0, frameCoordinate: '0x2' },
      // { id: 1, x: 1, y: 1, frameCoordinate: '0x2' },
      // { id: 2, x: 2, y: 2, frameCoordinate: '0x2' },
      // { id: 3, x: 3, y: 3, frameCoordinate: '0x2' },
      // { id: 4, x: 4, y: 4, frameCoordinate: '0x2' },
      // { id: 5, x: 5, y: 5, frameCoordinate: '0x2' },
      // { id: 6, x: 6, y: 6, frameCoordinate: '0x2' },
      // { id: 7, x: 7, y: 7, frameCoordinate: '0x2' },

      //Level '2'
      { id: 0, x: 2, y: 2, frameCoordinate: '0x4' },
      { id: 1, x: 2, y: 4, frameCoordinate: '1x9' },
      { id: 2, x: 2, y: 6, frameCoordinate: '0x2' },
      { id: 3, x: 2, y: 8, frameCoordinate: '0x2' },
      { id: 4, x: 4, y: 2, frameCoordinate: '0x2' },
      { id: 5, x: 4, y: 4, frameCoordinate: '0x2' },
      { id: 6, x: 4, y: 6, frameCoordinate: '0x2' },
      { id: 7, x: 4, y: 8, frameCoordinate: '0x2' },
      { id: 8, x: 6, y: 2, frameCoordinate: '0x2' },
      { id: 9, x: 6, y: 4, frameCoordinate: '0x2' },
      { id: 10, x: 6, y: 6, frameCoordinate: '0x2' },
      { id: 11, x: 6, y: 8, frameCoordinate: '0x2' },
      { id: 12, x: 8, y: 2, frameCoordinate: '0x2' },
      { id: 13, x: 8, y: 4, frameCoordinate: '0x2' },
      { id: 14, x: 8, y: 6, frameCoordinate: '0x2' },
      { id: 15, x: 8, y: 8, frameCoordinate: '0x2' },
      { id: 16, x: 7, y: 8, frameCoordinate: '0x2' },
    ],
  };

  return (
    <div className={styles.fullScreenContainer}>
      <div className={styles.gameScreen}>
        {level.placements.map((placement) => {
          const x = placement.x * CELL_SIZE + 'px';
          console.log('🚀 ~ {level.placements.map ~ x:', x);
          const y = placement.y * CELL_SIZE + 'px';
          console.log('🚀 ~ {level.placements.map ~ y:', y);

          const style: CSSProperties = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            transform: `translate3d(${x}, ${y}, 0)`,
            WebkitTransform: `translate3d(${x}, ${y}, 0)`,
            msTransform: `translate3d(${x}, ${y}, 0)`,
            MozTransform: `translate3d(${x}, ${y}, 0)`,
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
          };

          return (
            <div key={placement.id} style={style}>
              <Sprite
                image={spriteSheetImage}
                frameCoordinate={placement.frameCoordinate}
              />
            </div>
          );
        })}

        <Sprite image={spriteSheetImage} frameCoordinate="0x1" />
      </div>
    </div>
  );
}
