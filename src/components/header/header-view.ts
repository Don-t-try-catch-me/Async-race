import { CreateNavButton } from '@/components/ui/nav-button/nav-button';
import { createElement } from '@/utils/create-element';
import type { HeaderView } from '@/types/type';

export function CreateHeaderView(): HeaderView {
  const root = createElement('header', { className: 'header' });

  const inner = createElement('div', { className: 'container header__inner' });

  const title = createElement('h1', {
    className: 'header__title',
    textContent: 'Async Race',
  });

  const nav = createElement('nav', { className: 'nav' });

  const garageButton = CreateNavButton({ label: 'Garage' });
  const winnersButton = CreateNavButton({ label: 'Winners' });

  nav.append(garageButton, winnersButton);
  inner.append(title, nav);
  root.append(inner);

  return { root, garageBtn: garageButton, winnersBtn: winnersButton };
}
