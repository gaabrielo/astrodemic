import {
  CELL_SIZE,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from '@/utils/consts';
import { LevelProps } from '@/utils/types';

interface PlacementProperties {
  id: number;
  type: string;
  x: number;
  y: number;
  level: LevelProps;
}

export class Placement {
  id: number;
  type: string;
  x: number;
  y: number;
  level: LevelProps;
  travelPixelsPerFrame: number;
  movingPixelsRemaining: number;
  movingPixelsDirection: string;

  constructor(properties: PlacementProperties, level: LevelProps) {
    this.id = properties.id;
    this.type = properties.type;
    this.x = properties.x;
    this.y = properties.y;
    this.level = level;

    this.travelPixelsPerFrame = 1.5;
    this.movingPixelsRemaining = 0;
    this.movingPixelsDirection = DIRECTION_RIGHT;
  }

  tick() {}

  displayXY() {
    if (this.movingPixelsRemaining > 0) {
      return this.displayMovingXY();
    }

    const x = this.x * CELL_SIZE;
    const y = this.y * CELL_SIZE;
    return [x, y];
  }

  displayMovingXY() {
    const x = this.x * CELL_SIZE;
    const y = this.y * CELL_SIZE;
    const progressPixels = CELL_SIZE - this.movingPixelsRemaining;
    switch (this.movingPixelsDirection) {
      case DIRECTION_LEFT:
        return [x - progressPixels, y];
      case DIRECTION_RIGHT:
        return [x + progressPixels, y];
      case DIRECTION_UP:
        return [x, y - progressPixels];
      default:
        return [x, y + progressPixels];
    }
  }

  renderComponent(): React.ReactElement | null {
    return null;
  }
}
