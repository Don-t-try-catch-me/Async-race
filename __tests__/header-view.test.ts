import { CreateHeaderView } from '@/components/header/header-view';

describe('CreateHeaderView', () => {
  test('matches snapshot', () => {
    const view = CreateHeaderView();
    expect(view.root).toMatchSnapshot();
  });

  test('renders semantic header structure', () => {
    const view = CreateHeaderView();

    expect(view.root.tagName).toBe('HEADER');
    expect(view.root).toHaveClass('header');

    const inner = view.root.querySelector('.header__inner');
    expect(inner).not.toBeNull();

    const title = view.root.querySelector('h1.header__title');
    expect(title).not.toBeNull();
    expect(title?.textContent).toBe('Async Race');

    const nav = view.root.querySelector('nav.nav');
    expect(nav).not.toBeNull();
  });

  test('renders navigation buttons (Garage, Winners) and returns refs', () => {
    const view = CreateHeaderView();

    expect(view.garageBtn).toBeInstanceOf(HTMLButtonElement);
    expect(view.winnersBtn).toBeInstanceOf(HTMLButtonElement);

    expect(view.garageBtn.textContent).toBe('Garage');
    expect(view.winnersBtn.textContent).toBe('Winners');

    expect(view.garageBtn.type).toBe('button');
    expect(view.winnersBtn.type).toBe('button');
  });
});
