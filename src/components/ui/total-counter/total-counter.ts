import { createElement } from '@/utils/create-element';
import type { TotalCounterProperties } from '@/types/type';

export function CreateTotalCounter(properties: TotalCounterProperties) {
  const root = createElement('p', {
    className: 'page__subtitle',
    textContent: `Total ${properties.label}: ${properties.count}`,
  });
  const change = (n: number) => {
    root.textContent = `Total ${properties.label}: ${n}`;
  };
  return {
    root,
    change,
  };
}
