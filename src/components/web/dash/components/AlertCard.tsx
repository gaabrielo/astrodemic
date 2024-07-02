export function AlertCard({ title, subtitle }: any) {
  return (
    <div className="w-full h-[50vh] flex items-center justify-center bg-zinc-100 rounded-xl flex-col text-base">
      <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <h1 className="text-4xl leading-none text-red-400">!</h1>
      </div>

      <h1 className="font-bold text-slate-700">{title}</h1>
      <span>{subtitle}</span>
    </div>
  );
}
