import { createElement } from '@/utils/create-element';
import type { NavButtonParameters } from '@/types/type';

export function CreateNavButton(
  parameters: NavButtonParameters
): HTMLButtonElement {
  return createElement('button', {
    className: parameters.className ?? 'nav__btn',
    textContent: parameters.label,
    attrs: { type: 'button' },
  });
}
