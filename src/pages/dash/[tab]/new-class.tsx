import DashLayout from '@/components/web/dash/DashLayout';
import NewClassModal from '@/components/web/dash/components/NewClassModal';

export default function NewClassPage() {
  // return <NewClassModal />;
  return <></>;
}

NewClassPage.getLayout = function getLayout(page) {
  return <DashLayout>{page}</DashLayout>;
};
