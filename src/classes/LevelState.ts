import { Camera } from '@/classes/Camera';
import { DirectionControls } from '@/classes/DirectionControls';
import { GameLoop } from '@/classes/GameLoop';
import { placementFactory } from '@/classes/PlacementFactory';
import Levels from '@/levels/LevelsMap';
import {
  LEVEL_THEMES,
  PLACEMENT_TYPE_BATTLE_FRAME,
  PLACEMENT_TYPE_ENERGY_DRINK,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_WALL,
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
  isBattleMode: any;
  camera: any;
  heroSkin: string;

  constructor(
    levelId: string,
    heroSkin: string,
    onEmit: (props: LevelProps['level']) => void
  ) {
    this.id = levelId;
    this.onEmit = onEmit;
    this.heroSkin = heroSkin;

    this.directionControls = new DirectionControls();

    // start the level
    this.start();
  }

  start() {
    this.isBattleMode = false;
    const levelData = Levels[this.id];

    this.theme = levelData.theme;
    this.tilesWidth = levelData.tilesWidth;
    this.tilesHeight = levelData.tilesHeight;
    this.placements = levelData.placements.map((config: any) => {
      return placementFactory.createPlacement(config, this);
    });

    // cache a reference to the hero
    this.heroRef = this.placements.find((p) => p.type === PLACEMENT_TYPE_HERO);

    // create a camera
    this.camera = new Camera(this);

    this.startGameLoop();
  }

  startGameLoop() {
    this.gameLoop?.stop();
    this.gameLoop = new GameLoop(() => {
      this.tick();
    });
  }

  addPlacement(config) {
    this.placements.push(placementFactory.createPlacement(config, this));
  }

  deletePlacement(placementToRemove) {
    this.placements = this.placements.filter((p) => {
      return p.id !== placementToRemove.id;
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

    // update the camera
    this.camera.tick();

    // emit changes to React
    this.onEmit(this.getState());
  }

  isPositionOutOfBounds(x: number, y: number) {
    return (
      x === 0 ||
      y === 0 ||
      x >= this.tilesWidth! + 1 ||
      y >= this.tilesHeight! + 1
    );
  }

  battleMode() {
    this.isBattleMode = true;
    this.gameLoop.stop();
  }

  getState(): LevelProps['level'] {
    return {
      theme: this.theme,
      tilesWidth: this.tilesWidth!,
      tilesHeight: this.tilesHeight!,
      placements: this.placements!,
      isBattleMode: this.isBattleMode,
      cameraTransformX: this.camera.transformX,
      cameraTransformY: this.camera.transformY,
    };
  }

  destroy() {
    // tear down the level
    this.gameLoop.stop();

    this.directionControls.unbind();
  }
}
