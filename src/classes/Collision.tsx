export class Collision {
  forBody: any;
  level: any;
  placementsAtPosition: any;
  x: number;
  y: number;

  constructor(forBody: any, level: any, position: any = null) {
    this.forBody = forBody;
    this.level = level;
    this.placementsAtPosition = [];
    this.x = position ? position?.x : forBody.x;
    this.y = position ? position?.y : forBody.y;

    this.scanPlacementsAtPosition();
  }

  scanPlacementsAtPosition() {
    this.placementsAtPosition = this.level.placements.filter((p: any) => {
      const isSelf = p.id === this.forBody.id;
      return !isSelf && p.x === this.x && p.y === this.y;
    });
    // console.log(
    //   '🚀 ~ Collision ~ this.placementsAtPosition=this.level.placements.filter ~ placementsAtPosition:',
    //   this.placementsAtPosition
    // );
  }

  withSolidPlacement() {
    return (
      this,
      this.placementsAtPosition.find((p: any) => p.isSolidForBody(this.forBody))
    );
  }

  withPlacementAddsToInventory() {
    return this.placementsAtPosition.find((p: any) => {
      return (
        !p.hasBeenCollected && p.addsItemToInventoryOnCollide(this.forBody)
      );
    });
  }

  renderBattleLevel() {
    return this.placementsAtPosition.find((p: any) => {
      return p.renderBattleInCollide();
    });
  }
}
