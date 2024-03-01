import { currentCharacterNameAtom } from '@/atoms/currentCharacterNameAtom';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/primitives/Select';
import { CHARACTERS } from '@/utils/consts';
import { useRecoilState } from 'recoil';

const translate = {
  [CHARACTERS.HERO]: 'Herói',
  [CHARACTERS.ENGINEER]: 'Engenheira',
  [CHARACTERS.CLERIC]: 'Curandeiro',
  [CHARACTERS.ROGUE]: 'Maroto',
};

export function CharacterSelect() {
  const [currentCharacterName, setCurrentCharacterName] = useRecoilState<any>(
    currentCharacterNameAtom
  );

  return (
    <Select
      onValueChange={(val) => {
        setCurrentCharacterName(val);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder={translate[currentCharacterName]} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.keys(CHARACTERS).map((c: string, idx: number) => {
            return (
              <SelectItem value={c ?? 'unnamed' + idx}>
                {translate[c] ?? 'unnamed' + idx}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
