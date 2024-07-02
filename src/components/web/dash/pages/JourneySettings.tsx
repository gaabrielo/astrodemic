import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form, FormField, FormItem } from '@/components/ui/form';
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
import { updateLevel } from '@/services/dash/journey';
import { TrashIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';

export function JourneySettings({ data: levelData }: any) {
  const [data, setData] = useState<any>();
  const [defaultObject, setDefaultObject] = useState<any>();
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    const fData = {
      name: levelData.name,
      created_at: levelData.created_at,
      updated_at: levelData.updated_at,
      is_active: levelData.is_active,
      is_public: levelData.is_public,
    };

    setData(fData);
    setDefaultObject(fData);
  }, [levelData]);

  useEffect(() => {
    if (isEqual(data, defaultObject)) {
      setIsEdited(false);
    } else {
      setIsEdited(true);
    }
  }, [data, defaultObject]);

  async function handleSubmit() {
    const updatedData = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    const res = await updateLevel(updatedData, levelData.id);

    if (!res.error) {
      setData(res.data[0]);
      setDefaultObject(res.data[0]);
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Configurações</CardTitle>
      </CardHeader>

      {!!data && (
        <CardContent className="pt-4 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Nome</Label>
              <Input
                value={data.name}
                onChange={(e) =>
                  setData((prev: any) => ({ ...prev, name: e.target.value }))
                }
                defaultValue={defaultObject.name}
              />
            </div>

            <div>
              <Label>Criado em</Label>
              <Input
                defaultValue={format(
                  new Date(defaultObject.created_at),
                  'dd/MM/yyyy HH:mm'
                )}
                disabled
              />
            </div>

            <div>
              <Label>Modificado em</Label>
              <Input
                defaultValue={format(
                  new Date(defaultObject.updated_at),
                  'dd/MM/yyyy HH:mm'
                )}
                disabled
              />
            </div>

            {/* <div className="flex flex-col gap-1.5 text-sm">
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
          </div> */}
          </div>

          <Separator />

          <div>
            <h3 className="leading-none font-semibold">Acessibilidade</h3>
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
                  checked={!data.is_active}
                  onCheckedChange={(val) =>
                    setData((prev: any) => ({ ...prev, is_active: !val }))
                  }
                />
              </CardContent>
            </Card>

            <Card className={`flex items-center justify-between shadow-none`}>
              <CardHeader className={`p-4 ${!data.is_active && 'opacity-50'}`}>
                <Label htmlFor="turn_public">Tornar público</Label>
                <CardDescription>
                  Acessível a qualquer pessoa com o link.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0 pr-4">
                <Switch
                  id="turn_public"
                  checked={data.is_public && data.is_active}
                  disabled={!data.is_active}
                  onCheckedChange={(val) =>
                    setData((prev: any) => ({ ...prev, is_public: val }))
                  }
                />
              </CardContent>
            </Card>
          </div>

          <Separator />

          <footer className="flex">
            <Button
              variant="ghost"
              className="text-red-400 hover:text-red-400 hover:bg-red-50 gap-1 flex items-center mr-1 ml-auto px-2"
            >
              <TrashIcon className="w-4 h-4" />
              <span>Excluir sequência</span>
            </Button>

            {isEdited && (
              <Button
                className="gap-1 flex items-center px-2"
                onClick={handleSubmit}
              >
                <span>Salvar alterações</span>
              </Button>
            )}
          </footer>
        </CardContent>
      )}
    </Card>
  );
}
