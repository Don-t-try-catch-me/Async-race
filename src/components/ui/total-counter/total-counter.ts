import type { TotalCounterProperties } from '@/types/type';

export function createTotalCounter(
  properties: TotalCounterProperties
): HTMLParagraphElement {
  const element = document.createElement('p');
  element.className = 'page__subtitle';
  element.textContent = `Total ${properties.label}: ${properties.count}`;
  return element;
}
