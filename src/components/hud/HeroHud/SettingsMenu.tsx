import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/primitives/Dropdown';

export function SettingsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Configurações</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Configurações</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
