// import EnergyDrinkImg from '/energy-drink-icon.svg';

import { Item } from './Item';

export function EnergyCount({ level, count }: any) {
  return <Item count={count} src={'/energy-drink-icon.svg'} />;
}
