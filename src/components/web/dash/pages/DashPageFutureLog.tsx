import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/primitives/Button';
import { Textarea } from '@/components/ui/textarea';
import { FeedbackCard } from '@/components/web/dash/components/FeedbackCard';

export function DashPageFutureLog() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Futuras adições</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-ellipsis list-disc pl-12 gap-2 flex flex-col">
            <li>Personalização de mapas.</li>
            <li>Novas histórias e modos de combate.</li>
            <li>
              Coleta e análise de estatísticas de desempenho dos jogadores.
            </li>
            <li>
              Novas opções de avaliação (múltipla escolha, complete a frase,
              entre outras).
            </li>
          </ul>
        </CardContent>
      </Card>

      <FeedbackCard />
    </div>
  );
}
