import Sprite from '@/components/object-graphics/Sprite';
import { Placement } from '@/game-objects/Placement';
import { PLACEMENT_TYPE_ENERGY_DRINK, THEME_TILES_MAP } from '@/utils/consts';
import { TILES } from '@/utils/tiles';

export class BattleFramePlacement extends Placement {
  get isDisabled() {
    const nonCollectedEnergyDrink = this.level.placements.find((p) => {
      return p.type === PLACEMENT_TYPE_ENERGY_DRINK && !p.hasBeenCollected;
    });

    return Boolean(nonCollectedEnergyDrink);
  }

  renderBattleInCollide() {
    return !this.isDisabled;
  }

  renderComponent() {
    // const wallTileCord = THEME_TILES_MAP[this.level.theme].WALL;
    return (
      <Sprite
        frameCoordinate={
          this.isDisabled
            ? TILES.BATTLE_FRAME_TOP_LEFT_DISABLED
            : TILES.BATTLE_FRAME_TOP_LEFT
        }
        size={32}
      />
    );
  }
}
