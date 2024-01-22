import React from 'react';
import { Placement } from './Placement';
import Sprite from '../components/object-graphics/Sprite';
import { TILES } from '../utils/tiles';

export class GoalPlacement extends Placement {
  renderComponent() {
    return <Sprite frameCoordinate={TILES.GOAL_DISABLED} />;
  }
}
