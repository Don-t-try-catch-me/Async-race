import { getCars } from '@services/car-service';
import './styles/index.scss';

import { createLayoutController } from '@/components/layout/layout-controller';

function ensureRoot(): HTMLElement {
  const existing = document.querySelector<HTMLElement>('#root');
  if (existing) return existing;

  const created = document.createElement('div');
  created.id = 'root';
  document.body.append(created);
  return created;
}

const root = ensureRoot();

root.replaceChildren(createLayoutController());

console.log(await getCars());
