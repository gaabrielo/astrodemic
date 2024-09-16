import { currentLevelIdAtom } from '@/atoms/currentLevelIdAtom';
import Levels from '@/levels/LevelsMap';
import { useRecoilState } from 'recoil';

export default function BattleModeMessage() {
  const [currentId, setCurrentId] = useRecoilState(currentLevelIdAtom);

  return (
    <div className="flex items-center">
      <h1 className="inline">
        Você gastará <strong>4 energéticos</strong> para essa batalha
      </h1>

      <div className="bg-red-400 h-full w-2 px-4" />

      <button
        className="min-w-32 text-right"
        onClick={() => {
          const levelsArray = Object.keys(Levels);
          const currentIndex = levelsArray.findIndex((id) => id === currentId);
          const nextLevelId = levelsArray[currentIndex + 1] ?? levelsArray[0];

          setCurrentId(nextLevelId);
        }}
      >
        <li className="hover:list-disc list-none">Confirmar</li>
      </button>
    </div>
  );
}

// const Chip = ({ label, variant = null }) => {
//   return <span className="">{label}</span>;
// };
