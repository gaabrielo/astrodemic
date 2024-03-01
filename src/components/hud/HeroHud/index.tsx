import { CharacterSelect } from './CharacterSelect';
import { EnergyCount } from './EnergyCount';
import { PLACEMENT_TYPE_ENERGY_DRINK } from '@/utils/consts';

export function HeroHud({ level }: any) {
  const currentEnergy = level.placements.filter((p) => {
    return p.type === PLACEMENT_TYPE_ENERGY_DRINK && !!p.hasBeenCollected;
  }).length;

  const energyNeeded = 3;

  return (
    <div className="absolute left-10 top-10 bg-white w-full max-w-64 rounded-md border-2 border-b-4 border-gray-800 p-4 flex flex-col gap-3 font-mono">
      <EnergyCount level={level} count={currentEnergy} />

      <div className="w-full text-right">
        <progress value={currentEnergy} max={energyNeeded} className="w-full" />
        <span>
          {currentEnergy}/{energyNeeded}
        </span>
      </div>

      <div>
        <h1 className="mb-1">Configurações</h1>
        <div className="w-full h-[1px] bg-gray-400" />
      </div>

      <CharacterSelect />
    </div>
  );
}
