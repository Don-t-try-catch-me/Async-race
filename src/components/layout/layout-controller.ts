import { CreateLayoutView } from './layout-view';
import { createGarageController } from '@/pages/garage/garage-controller';
import { CreateWinnersController } from '@/pages/winners/winners-controller';
import type { LayoutView, PageKey } from '@/types/type';

function setActiveTab(view: LayoutView, page: PageKey): void {
  view.garageBtn.classList.toggle('nav__btn_active', page === 'garage');
  view.winnersBtn.classList.toggle('nav__btn_active', page === 'winners');
}

export async function CreateLayoutController() {
  const view = CreateLayoutView();

  view.garageBtn.addEventListener(
    'click',
    () => void renderPage('garage', view)
  );
  view.winnersBtn.addEventListener(
    'click',
    () => void renderPage('winners', view)
  );

  await renderPage('garage', view);

  return view.root;
}

async function renderPage(page: PageKey, view: LayoutView) {
  try {
    setActiveTab(view, page);

    const pageNode =
      page === 'garage'
        ? await createGarageController()
        : CreateWinnersController();

    if (!pageNode) {
      throw new Error('Failed to render page, please try again');
    }

    view.content.replaceChildren(pageNode);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
