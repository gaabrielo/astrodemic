import { DashAside } from '@/components/ui/dash/DashAside';

export default function DashLayout({ children }: any) {
  return (
    <div className="w-full h-screen overflow-y-auto">
      <div className="mx-auto flex w-full max-w-7xl">
        <DashAside />

        {children}
      </div>
    </div>
  );
}
