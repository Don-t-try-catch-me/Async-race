import type { WinnersView } from '@/types/type';

export function createWinnersView(): WinnersView {
  const root = document.createElement('section');
  root.className = 'page page-winners';

  const title = document.createElement('h1');
  title.className = 'page__title';
  title.textContent = 'Winners';

  const hint = document.createElement('p');
  hint.className = 'page__hint';
  hint.textContent = 'Stub page. UI will be implemented later.';

  root.append(title, hint);

  return { root };
}
