import Sprite from '@/components/object-graphics/Sprite';
import styles from './RenderLevel.module.css';
import { LEVEL_THEMES, THEME_BACKGROUNDS } from '@/utils/consts';
import LevelBackgroundTilesLayer from './LevelBackgroundTilesLayer';
import LevelPlacementsLayer from '@/components/level-layout/LevelPlacementsLayer';
import { useEffect, useState } from 'react';
import { LevelState } from '@/classes/LevelState';
import { LevelProps } from '@/utils/types';
import { HeroHud } from '@/components/hud/HeroHud';
import { useRecoilValue } from 'recoil';
import { currentLevelIdAtom } from '@/atoms/currentLevelIdAtom';
import Dialog from '@/components/hud/Dialog';
import { currentCharacterNameAtom } from '@/atoms/currentCharacterNameAtom';

export default function RenderLevel() {
  const [level, setLevel] = useState<LevelProps['level'] | null>(null);
  const currentLevelId = useRecoilValue(currentLevelIdAtom);
  const characterName = useRecoilValue(currentCharacterNameAtom);

  useEffect(() => {
    // create and subscribe to state changes
    const levelState = new LevelState(
      currentLevelId,
      characterName,
      (newState) => {
        setLevel(newState);
      }
    );

    // get initial state
    // setLevel(levelState.getState());

    // destroy method when component unmounts
    return () => levelState.destroy();
  }, [currentLevelId, characterName]);

  if (!level) return null;

  const cameraTranslate = `translate3d(${level.cameraTransformX}, ${level.cameraTransformY}, 0)`;

  return (
    <div
      className={styles.fullScreenContainer}
      style={{
        backgroundColor: THEME_BACKGROUNDS[level.theme],
      }}
    >
      <div className={styles.gameScreen}>
        <div
          style={{
            transform: cameraTranslate,
          }}
        >
          <LevelBackgroundTilesLayer level={level} />
          <LevelPlacementsLayer level={level} />
        </div>
      </div>

      <HeroHud level={level} />
      <Dialog level={level} />
    </div>
  );
}
