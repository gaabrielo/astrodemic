import DashLayout from '@/components/web/dash/DashLayout';
import { AlertCard } from '@/components/web/dash/components/AlertCard';
import { DashPageHeader } from '@/components/web/dash/components/DashPageHeader';
import { DashPageFutureLog } from '@/components/web/dash/pages/DashPageFutureLog';
import { DashPageHome } from '@/components/web/dash/pages/DashPageHome';
import { DashPageJourneyList } from '@/components/web/dash/pages/DashPageJourneyList';
import { DashPageReport } from '@/components/web/dash/pages/DashPageReport';
import { DashPageSearchLevel } from '@/components/web/dash/pages/DashPageSearchLevel';
import { dashTabs } from '@/utils/consts';
import { useRouter } from 'next/router';

export default function DashPages() {
  const router = useRouter();

  function getActiveTab() {
    if (!router) return;

    switch (router.query.tab) {
      case 'journey':
        return <DashPageJourneyList />;

      case 'home':
        return <DashPageHome />;

      case 'futureLog':
        return <DashPageFutureLog />;

      case 'report':
        return <DashPageReport />;

      case 'search':
        return <DashPageSearchLevel />;

      default:
        return (
          <AlertCard
            title={'Página não encontrada'}
            subtitle={
              'O conteúdo foi removido ou pode não estar disponível no momento.'
            }
          />
        );
    }
  }

  function getActiveTabLabel() {
    if (!router) return;
    return dashTabs[router.query.tab];
  }

  // useEffect(() => {
  //   getUserData();
  // }, []);

  // const getUserData = async () => {
  //   const userSession = await supabase.auth.getSession();
  // };

  return (
    <div className="w-full overflow-hidden p-3 pb-8 h-fit">
      <div className="w-full flex flex-col flex-1">
        <DashPageHeader title={getActiveTabLabel()?.label ?? null} />

        {getActiveTab()}
      </div>
    </div>
  );
}

DashPages.getLayout = function getLayout(page) {
  return <DashLayout>{page}</DashLayout>;
};
