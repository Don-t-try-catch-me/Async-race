import './styles/index.scss';

import { CreateLayoutController } from '@/components/layout/layout-controller';
import { createElement } from '@/utils/create-element';

function ensureRoot(): HTMLElement {
  const existing = document.querySelector<HTMLElement>('#root');
  if (existing) return existing;

  const created = createElement('div', { attrs: { id: 'root' } });
  document.body.append(created);
  return created;
}

const root = ensureRoot();

root.replaceChildren(CreateLayoutController());
