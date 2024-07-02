import { DashAside } from '@/components/web/dash/DashAside';

export default function DashLayout({ children }: any) {
  return (
    <div className="w-full h-screen overflow-y-auto">
      <div className="mx-auto flex w-full max-w-7xl gap-0">
        <DashAside />

        {children}
      </div>
    </div>
  );
}
