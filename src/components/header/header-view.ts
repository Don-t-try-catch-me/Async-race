import { createNavButton } from '@/components/ui/nav-button/nav-button';
import type { HeaderView } from '@/types/type';

export function createHeaderView(): HeaderView {
  const root = document.createElement('header');
  root.className = 'header';

  const inner = document.createElement('div');
  inner.className = 'container header__inner';

  const title = document.createElement('h1');
  title.className = 'header__title';
  title.textContent = 'Async Race';

  const nav = document.createElement('nav');
  nav.className = 'nav';

  const garageButton = createNavButton({ label: 'Garage' });
  const winnersButton = createNavButton({ label: 'Winners' });

  nav.append(garageButton, winnersButton);
  inner.append(title, nav);
  root.append(inner);

  return { root, garageBtn: garageButton, winnersBtn: winnersButton };
}
