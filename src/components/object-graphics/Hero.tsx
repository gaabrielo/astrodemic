import { TILES } from '@/utils/tiles';
import Sprite from './Sprite';
import styles from './Hero.module.css';

export default function Hero({ frameCoord, yTranslate }: any) {
  return (
    <div className={styles.hero}>
      <div>
        <Sprite frameCoordinate={TILES.SHADOW} />
      </div>
      <div
        className={styles.heroBody}
        style={{
          transform: `translateY(${yTranslate}px)`,
        }}
      >
        <Sprite frameCoordinate={frameCoord} size={32} />
      </div>
    </div>
  );
}
