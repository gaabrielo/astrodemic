import { BattleFramePlacement } from '@/game-objects/BattleFramePlacement';
import { EnergyDrinkPlacement } from '@/game-objects/EnergyDrinkPlacement';
import { GoalPlacement } from '@/game-objects/GoalPlacement';
import { HeroPlacement } from '@/game-objects/HeroPlacement';
import { WallPlacement } from '@/game-objects/WallPlacement';
import {
  PLACEMENT_TYPE_BATTLE_FRAME,
  PLACEMENT_TYPE_ENERGY_DRINK,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_WALL,
} from '@/utils/consts';

class PlacementFactory {
  createPlacement(config, level) {
    const instance = this.getInstance(config, level);

    // generate ID here...
    return instance;
  }

  getInstance(config, level) {
    switch (config.type) {
      case PLACEMENT_TYPE_HERO:
        return new HeroPlacement(config, level);
      case PLACEMENT_TYPE_GOAL:
        return new GoalPlacement(config, level);
      case PLACEMENT_TYPE_WALL:
        return new WallPlacement(config, level);
      case PLACEMENT_TYPE_BATTLE_FRAME:
        return new BattleFramePlacement(config, level);
      case PLACEMENT_TYPE_ENERGY_DRINK:
        return new EnergyDrinkPlacement(config, level);

      default:
        console.warn('NO TYPE FOUND', config.type);
        return null;
    }
  }
}

export const placementFactory = new PlacementFactory();
