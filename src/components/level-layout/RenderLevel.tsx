import Sprite from '@/components/object-graphics/Sprite';
import styles from './RenderLevel.module.css';
import { LEVEL_THEMES, THEME_BACKGROUNDS } from '@/utils/consts';
import LevelBackgroundTilesLayer from './LevelBackgroundTilesLayer';
import LevelPlacementsLayer from '@/components/level-layout/LevelPlacementsLayer';
import { useEffect, useState } from 'react';
import { LevelState } from '@/classes/LevelState';
import { LevelProps } from '@/utils/types';

export default function RenderLevel() {
  const [level, setLevel] = useState<LevelProps['level'] | null>(null);

  useEffect(() => {
    // create and subscribe to state changes
    const levelState = new LevelState('1-1', (newState) => {
      setLevel(newState);
    });

    // get initial state
    setLevel(levelState.getState());

    // destroy method when component unmounts
    return () => levelState.destroy();
  }, []);

  if (!level) return null;

  return (
    <div
      className={styles.fullScreenContainer}
      style={{
        backgroundColor: THEME_BACKGROUNDS[level.theme],
      }}
    >
      <div className={styles.gameScreen}>
        <LevelBackgroundTilesLayer level={level} />
        <LevelPlacementsLayer level={level} />
      </div>
    </div>
  );
}
