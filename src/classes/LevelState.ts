import { DirectionControls } from '@/classes/DirectionControls';
import { GameLoop } from '@/classes/GameLoop';
import { placementFactory } from '@/classes/PlacementFactory';
import {
  LEVEL_THEMES,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_HERO,
} from '@/utils/consts';
import { TILES } from '@/utils/tiles';
import { LevelPlacementsProps, LevelProps } from '@/utils/types';

export class LevelState {
  id: string;
  onEmit: (props: LevelProps['level']) => void;
  theme: any;
  tilesWidth?: number;
  tilesHeight?: number;
  placements?: any;
  gameLoop: any;
  directionControls: any;
  // hero placement
  heroRef: any;

  constructor(levelId: string, onEmit: (props: LevelProps['level']) => void) {
    this.id = levelId;
    this.onEmit = onEmit;

    this.directionControls = new DirectionControls();

    // start the level
    this.start();
  }

  start() {
    console.log('🚀 ~ LevelState ~ start ~ this:', this);

    this.theme = LEVEL_THEMES.BLUE;
    this.tilesWidth = 8;
    this.tilesHeight = 8;
    this.placements = [
      { id: 0, x: 2, y: 2, type: PLACEMENT_TYPE_HERO },
      { id: 1, x: 6, y: 4, type: PLACEMENT_TYPE_GOAL },
    ].map((config) => {
      return placementFactory.createPlacement(config, this);
    });

    // cache a reference to the hero
    this.heroRef = this.placements.find((p) => p.type === PLACEMENT_TYPE_HERO);

    this.startGameLoop();
  }

  startGameLoop() {
    this.gameLoop?.stop();
    this.gameLoop = new GameLoop(() => {
      this.tick();
    });
  }

  tick() {
    // check for movement here
    if (this.directionControls.direction) {
      this.heroRef.controllerMoveRequested(this.directionControls.direction);
    }

    // call "tick" on any Placement that wants to update
    this.placements.forEach((placement) => {
      placement.tick();
    });

    // emit changes to React
    this.onEmit(this.getState());
  }

  getState(): LevelProps['level'] {
    return {
      theme: this.theme,
      tilesWidth: this.tilesWidth!,
      tilesHeight: this.tilesHeight!,
      placements: this.placements!,
    };
  }

  destroy() {
    // tear down the level
    this.gameLoop.stop();

    this.directionControls.unbind();
  }
}
