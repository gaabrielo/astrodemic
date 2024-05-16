import { Button } from '@/components/ui/button';
import DashLayout from '@/components/ui/dash/DashLayout';
import { DashPageJourney } from '@/components/ui/dash/pages/DashPageJourney';
import { Separator } from '@/components/ui/primitives/Separator';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/services/supabase';
import { dashTabs } from '@/utils/consts';
import { PlusCircleIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function DashPages() {
  const router = useRouter();

  function getActiveTab() {
    if (!router) return;

    switch (router.query.tab) {
      case 'journey':
        return <DashPageJourney />;
    }
  }

  function getActiveTabLabel() {
    if (!router) return;

    return dashTabs[router.query.tab];
  }

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userSession = await supabase.auth.getSession();
    console.log('🚀 ~ getUserData ~ userSession:', userSession);
    const user = await supabase.auth.getUser();
    console.log('🚀 ~ getUserData ~ user:', user);
  };

  return (
    // <DashLayout>
    <div className="flex-1 p-3 pb-8 h-fit">
      <div className="w-full max-w-3xl mx-auto flex flex-col">
        <header className="flex justify-between">
          <h1 className="text-xl mt-1 font-bold">
            {getActiveTabLabel()?.label ?? (
              <Skeleton className="w-full max-w-48 h-7" />
            )}
          </h1>
        </header>

        <Separator className="mt-5 mb-8" />

        {getActiveTab()}
      </div>
    </div>
    // </DashLayout>
  );
}

DashPages.getLayout = function getLayout(page) {
  return <DashLayout>{page}</DashLayout>;
};
