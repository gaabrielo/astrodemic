import React from 'react';
import { Placement } from './Placement';
import Hero from '@/components/object-graphics/Hero';
import { directionUpdateMap } from '@/utils/consts';

export class HeroPlacement extends Placement {
  controllerMoveRequested(direction) {
    // attempt to start movie
    if (this.movingPixelsRemaining > 0) {
      return;
    }

    //start the move
    this.movingPixelsRemaining = 16;
    this.movingPixelsDirection = direction;
  }

  tick() {
    this.tickMovingPixelProgress();
  }

  tickMovingPixelProgress() {
    if (this.movingPixelsRemaining === 0) {
      return;
    }

    this.movingPixelsRemaining -= this.travelPixelsPerFrame;
    if (this.movingPixelsRemaining <= 0) {
      this.movingPixelsRemaining = 0;

      // done moving
      this.onDoneMoving();
    }
  }

  onDoneMoving() {
    const { x, y } = directionUpdateMap[this.movingPixelsDirection];
    this.x += x;
    this.y += y;
  }

  renderComponent() {
    return <Hero />;
  }
}
