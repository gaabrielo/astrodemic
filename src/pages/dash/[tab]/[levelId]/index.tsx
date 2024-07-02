import DashLayout from '@/components/web/dash/DashLayout';
import { AlertCard } from '@/components/web/dash/components/AlertCard';
import { DashPageHeader } from '@/components/web/dash/components/DashPageHeader';
import { JourneyPage } from '@/components/web/dash/pages/JourneyPage';
import { dashTabs } from '@/utils/consts';
import { useRouter } from 'next/router';

function getActiveTabLabel(tab: string) {
  if (!tab) return;

  return dashTabs[tab];
}

export default function LevelJourneyPage() {
  const router = useRouter();

  function getActiveTab() {
    if (!router?.query?.tab) return <></>;

    switch (router?.query?.tab) {
      case 'journey':
        return <JourneyPage levelId={router.query.levelId} />;
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

  if (!router) return <></>;

  return (
    <div className="flex-1 p-3 pb-8 h-fit">
      <div className="w-full flex flex-col flex-1">
        <DashPageHeader
          title={getActiveTabLabel(router?.query?.tab)?.label ?? null}
        />
        {getActiveTab()}
      </div>
    </div>
  );
}

LevelJourneyPage.getLayout = function getLayout(page) {
  return <DashLayout>{page}</DashLayout>;
};
