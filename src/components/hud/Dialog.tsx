import BattleModeMessage from '@/components/hud/BattleModeMessage';

export default function Dialog({ level }: any) {
  function renderBox(): boolean {
    if (!level.isBattleMode) return false;

    return true;
  }

  return (
    <div
      className={`absolute left-0 right-0 bottom-8 w-full flex justify-center font-mono ${
        renderBox() ? 'flex' : 'hidden'
      }`}
    >
      <div className="w-full max-w-xl bg-white rounded-md border-2 border-b-4 border-gray-800 p-4">
        {level.isBattleMode && <BattleModeMessage />}
      </div>
    </div>
  );
}
