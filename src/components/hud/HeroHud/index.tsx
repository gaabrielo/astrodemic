import { Calendar, Sun } from 'lucide-react';
import { CharacterSelect } from './CharacterSelect';
import { EnergyCount } from './EnergyCount';
import { PLACEMENT_TYPE_ENERGY_DRINK } from '@/utils/consts';
import { Item } from '@/components/hud/HeroHud/Item';
import { Separator } from '@/components/ui/primitives/Separator';
import { SettingsMenu } from '@/components/hud/HeroHud/SettingsMenu';

export function HeroHud({ level }: any) {
  const currentEnergy = level.placements.filter((p) => {
    return p.type === PLACEMENT_TYPE_ENERGY_DRINK && !!p.hasBeenCollected;
  }).length;

  const energyNeeded = 3;

  return (
    <div className="absolute left-6 top-6 bg-white rounded-md border-2 border-b-4 border-gray-800 p-3 flex items-center gap-3 font-mono">
      {/* <div className="flex items-center w-full gap-3 bg-slate-100 p-4 rounded-md shadow-inner shadow-input"></div> */}
      <div className="bg-yellow-400 rounded-2xl px-3 py-2 font-semibold flex gap-3 text-slate-950">
        <Sun
          className="w-6 h-6 fill-slate-950 font-black"
          absoluteStrokeWidth
        />
        <span>DIA 1</span>
      </div>
      <Item src={'/energy-drink-icon.svg'} count={currentEnergy} />
      <Item src={'/lamen-icon.svg'} count={currentEnergy} />
      <Item src={'/clover-icon.svg'} count={currentEnergy} />

      <Separator orientation="vertical" />

      {/* <div className="w-full text-right">
        <progress value={currentEnergy} max={energyNeeded} className="w-full" />
        <span>
          {currentEnergy}/{energyNeeded}
        </span>
      </div> */}
      {/* <div>
        <h1 className="mb-1">Configurações</h1>
        <div className="w-full h-[1px] bg-gray-400" />
      </div>

      <CharacterSelect /> */}
      <SettingsMenu />
    </div>
  );
}
