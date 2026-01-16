import { createLayoutView } from './layout-view';
import { createGarageController } from '@/pages/garage/garage-controller';
import { createWinnersController } from '@/pages/winners/winners-controller';
import type { LayoutView, PageKey } from '@/types/type';

function setActiveTab(view: LayoutView, page: PageKey): void {
  view.garageBtn.classList.toggle('nav__btn_active', page === 'garage');
  view.winnersBtn.classList.toggle('nav__btn_active', page === 'winners');
}

export function createLayoutController(): HTMLElement {
  const view = createLayoutView();

  const renderPage = (page: PageKey): void => {
    setActiveTab(view, page);

    const pageNode =
      page === 'garage' ? createGarageController() : createWinnersController();

    view.content.replaceChildren(pageNode);
  };

  view.garageBtn.addEventListener('click', () => renderPage('garage'));
  view.winnersBtn.addEventListener('click', () => renderPage('winners'));

  renderPage('garage');

  return view.root;
}
