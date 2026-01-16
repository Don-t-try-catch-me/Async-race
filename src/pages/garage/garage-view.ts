import type { GarageView } from '@/types/type';

export function createGarageView(): GarageView {
  const root = document.createElement('section');
  root.className = 'page';

  const title = document.createElement('h1');
  title.className = 'page__title';
  title.textContent = 'Garage';

  const hint = document.createElement('p');
  hint.className = 'page__hint';
  hint.textContent = 'Stub page. UI will be implemented later.';

  root.append(title, hint);

  return { root };
}
