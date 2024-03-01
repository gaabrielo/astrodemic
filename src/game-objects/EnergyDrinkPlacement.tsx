import ElevatedSprite from '@/components/object-graphics/ElevatedSprite';
import { Placement } from '@/game-objects/Placement';
import { PLACEMENT_TYPE_ENERGY_DRINK } from '@/utils/consts';
import { TILES } from '@/utils/tiles';
import { ReactElement, JSXElementConstructor } from 'react';

export class EnergyDrinkPlacement extends Placement {
  addsItemToInventoryOnCollide(): any {
    return PLACEMENT_TYPE_ENERGY_DRINK;
  }

  renderComponent(): ReactElement<
    any,
    string | JSXElementConstructor<any>
  > | null {
    return <ElevatedSprite frameCoordinate={TILES.FLOUR} />;
  }
}
