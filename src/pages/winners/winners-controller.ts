import { createWinnersView } from './winners-view';

export function createWinnersController(): HTMLElement {
  const view = createWinnersView();
  return view.root;
}
