// import EnergyDrinkImg from '/energy-drink-icon.svg';

export function EnergyCount({ level, count }: any) {
  const image = new Image();
  image.src = '/energy-drink-icon.svg';

  return (
    <div className="flex items-center gap-1">
      <img
        src="/energy-drink-icon.svg"
        alt="Energy drink count"
        className="w-8 h-8"
      />
      <h1 className="text-black text-xl">{count}</h1>
    </div>
  );
}
