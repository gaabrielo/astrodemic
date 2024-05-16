import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/primitives/Button';
import { Input } from '@/components/ui/primitives/Input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/primitives/Select';
import { Separator } from '@/components/ui/primitives/Separator';
import { Switch } from '@/components/ui/switch';
import { TrashIcon } from '@radix-ui/react-icons';

export function JourneySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label>Nome</Label>
            <Input
              value="Caminhos do React"
              // disabled
            />
          </div>

          <div>
            <Label>Criado em</Label>
            <Input value="10/05/2024" disabled />
          </div>

          <div>
            <Label>Modificado em</Label>
            <Input value="21/05/2024" disabled />
          </div>

          <div className="flex flex-col gap-1.5 text-sm">
            <Label>Linguagem</Label>

            <Select defaultValue="pt_BR">
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma linguagem" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="pt_BR">Português</SelectItem>
                  <SelectItem value="en_US">Inglês</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="leading-none font-semibold">Acessibilidade</h3>
          {/* <p className="text-sm mt-1.5 text-gray-500">
                    Somente 1 das opções abaixo poderá estar ativa
                  </p> */}
        </div>

        <div className="flex flex-col gap-4">
          <Card className={`flex items-center justify-between shadow-none`}>
            <CardHeader className="p-4">
              <Label htmlFor="enable-hint">Não listado</Label>
              <CardDescription>
                Ao habilitar, somente você terá acesso a isso.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 pr-4">
              <Switch
                id="enable-hint"
                // onCheckedChange={(val) => {
                //   setHasTip(val);
                // }}
              />
            </CardContent>
          </Card>

          <Card className={`flex items-center justify-between shadow-none`}>
            <CardHeader className="p-4">
              <Label htmlFor="enable-hint">Tornar público</Label>
              <CardDescription>
                Acessível a qualquer pessoa com o link.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 pr-4">
              <Switch
                id="enable-hint"
                // onCheckedChange={(val) => {
                //   setHasTip(val);
                // }}
              />
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* <Button className="max-w-fit">Excluir</Button> */}
        <Button
          variant="ghost"
          className="text-red-400 hover:text-red-600 gap-1 flex items-center mr-0 ml-auto px-2"
        >
          <TrashIcon className="w-4 h-4" />
          <span>Excluir Sequência</span>
        </Button>
      </CardContent>
    </Card>
  );
}
