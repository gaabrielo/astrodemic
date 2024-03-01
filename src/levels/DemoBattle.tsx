import {
  LEVEL_THEMES,
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_WALL,
} from '@/utils/consts';

const level = {
  theme: LEVEL_THEMES.BLUE,
  tilesWidth: 7,
  tilesHeight: 7,
  placements: [
    { x: 6, y: 4, type: PLACEMENT_TYPE_HERO },
    { x: 2, y: 4, type: PLACEMENT_TYPE_HERO },
  ],
};

export default level;
