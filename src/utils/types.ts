export interface LevelProps {
  level: {
    theme: string;
    tilesWidth: number;
    tilesHeight: number;
    placements: LevelPlacementsProps[];
  };
}

export interface LevelPlacementsProps {
  id: number;
  x: number;
  y: number;
  frameCoordinate: string;
}

export interface PlacementProps {
  id: number;
  type: string;
  x: number;
  y: number;
  // level:
}

export interface PlacementConfigProps {
  id: number;
  x: number;
  y: number;
  type: string;
}
