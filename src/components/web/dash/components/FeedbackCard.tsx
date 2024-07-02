import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/primitives/Button';
import { Textarea } from '@/components/ui/textarea';

export function FeedbackCard() {
  return (
    <Card className="bg-zinc-100 shadow-none">
      <CardHeader>
        <CardTitle>Deixe seu feedback</CardTitle>
        <CardDescription>
          Contribua com o projeto compartilhando sua experiência e ideias para
          as próximas atualizações
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full text-right">
        <Textarea
          placeholder="Digite seu feedback..."
          className="min-h-28 bg-white"
        />

        <p className="w-full text-left mb-2 mt-4 font-semibold">
          Como você classifica sua experiência?
        </p>

        <ul className="space-y-2">
          {['Muito boa', 'Boa', 'Neutra', 'Ruim', 'Muito ruim'].map(
            (alt, altKey) => {
              return (
                <li className="flex items-center text-sm gap-2" key={altKey}>
                  <Checkbox />
                  <span>{alt}</span>
                </li>
              );
            }
          )}
        </ul>

        <Button className="mt-2 mr-0 ml-auto">Enviar</Button>
      </CardContent>
    </Card>
  );
}
