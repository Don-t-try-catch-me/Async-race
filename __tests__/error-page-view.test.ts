import { createErrorPageView } from '@/pages/error/error-page-view';
import { Route } from '@/types/type';

describe('createErrorPageView', () => {
  test('matches snapshot', () => {
    const view = createErrorPageView();
    expect(view.root).toMatchSnapshot();
  });

  test('navigates to Garage on button click', () => {
    const view = createErrorPageView();

    globalThis.location.hash = Route.Error;

    view.goGarageBtn.click();

    expect(globalThis.location.hash).toBe(Route.Garage);
  });
});
