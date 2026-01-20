import { createElement } from '@/utils/create-element';
import { CreateNavButton } from '@/components/ui/nav-button/nav-button';
import { Route, type ErrorPageView } from '@/types/type';

export function createErrorPageView(): ErrorPageView {
  const root = createElement('section', { className: 'page page-error' });

  const title = createElement('h1', {
    className: 'page__title',
    textContent: 'Something went wrong',
  });

  const text = createElement('p', {
    className: 'page__subtitle',
    textContent: 'Please return to Garage and try again.',
  });

  const goGarageButton = CreateNavButton({ label: 'Go to Garage' });

  goGarageButton.addEventListener('click', () => {
    globalThis.location.hash = Route.Garage;
  });

  root.append(title, text, goGarageButton);

  return { root, goGarageBtn: goGarageButton };
}
