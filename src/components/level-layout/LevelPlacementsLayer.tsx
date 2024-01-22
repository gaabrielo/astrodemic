import { LevelProps } from '@/utils/types';
import { CSSProperties } from 'react';

export default function LevelPlacementsLayer({ level }: LevelProps) {
  return level.placements.map((placement) => {
    const [x, y] = placement.displayXY();

    const style: CSSProperties = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      transform: `translate3d(${x}px, ${y}px, 0)`,
      WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
      msTransform: `translate3d(${x}px, ${y}px, 0)`,
      MozTransform: `translate3d(${x}px, ${y}px, 0)`,
      transformStyle: 'preserve-3d',
      WebkitTransformStyle: 'preserve-3d',
    };

    return (
      <div key={placement.id} style={style}>
        {placement.renderComponent()}
      </div>
    );
  });
}
