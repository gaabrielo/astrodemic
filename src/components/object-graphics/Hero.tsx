import { TILES } from '@/utils/tiles';
import Sprite from './Sprite';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div>
        <Sprite frameCoordinate={TILES.SHADOW} />
      </div>
      <div className={styles.heroBody}>
        <Sprite frameCoordinate={TILES.HERO_RIGHT} size={32} />
      </div>
    </div>
  );
}
