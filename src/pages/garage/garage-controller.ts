import { createGarageView } from './garage-view';

export function createGarageController(): HTMLElement {
  const view = createGarageView();

  return view.root;
}
