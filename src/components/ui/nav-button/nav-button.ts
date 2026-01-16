import type { NavButtonParameters } from '@/types/type';

export function createNavButton(
  parameters: NavButtonParameters
): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = parameters.className ?? 'nav__btn';
  button.textContent = parameters.label;
  return button;
}
