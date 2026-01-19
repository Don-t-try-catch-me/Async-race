import { CreateLayoutView } from './layout-view';
import { createGarageController } from '@/pages/garage/garage-controller';
import { CreateWinnersController } from '@/pages/winners/winners-controller';
import type { LayoutView, PageKey } from '@/types/type';

function setActiveTab(view: LayoutView, page: PageKey): void {
  view.garageBtn.classList.toggle('nav__btn_active', page === 'garage');
  view.winnersBtn.classList.toggle('nav__btn_active', page === 'winners');
}

export function CreateLayoutController(): HTMLElement {
  const view = CreateLayoutView();

  const renderPage = (page: PageKey): void => {
    setActiveTab(view, page);

    const pageNode =
      page === 'garage' ? createGarageController() : CreateWinnersController();

    view.content.replaceChildren(pageNode);
  };

  view.garageBtn.addEventListener('click', () => renderPage('garage'));
  view.winnersBtn.addEventListener('click', () => renderPage('winners'));

  renderPage('garage');

  return view.root;
}
