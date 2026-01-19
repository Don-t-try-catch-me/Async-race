import { createElement } from '@/utils/create-element';
import type { TotalCounterProperties } from '@/types/type';

export function CreateTotalCounter(
  properties: TotalCounterProperties
): HTMLParagraphElement {
  return createElement('p', {
    className: 'page__subtitle',
    textContent: `Total ${properties.label}: ${properties.count}`,
  });
}
