import DashLayout from '@/components/ui/dash/DashLayout';
import NewClassModal from '@/components/ui/dash/components/NewClassModal';

export default function NewClassPage() {
  return <NewClassModal />;
}

NewClassPage.getLayout = function getLayout(page) {
  return <DashLayout>{page}</DashLayout>;
};
