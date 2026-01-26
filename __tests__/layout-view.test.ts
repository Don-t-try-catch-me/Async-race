import { CreateLayoutView } from '@/components/layout/layout-view';
import { FOOTER_CONFIG } from '@/constants/constants';

describe('CreateLayoutView', () => {
  test('renders layout structure: header + main(container) + footer', () => {
    const view = CreateLayoutView();

    expect(view.root.tagName).toBe('DIV');
    expect(view.root).toHaveClass('layout');

    expect(view.header).toBeInstanceOf(HTMLElement);
    expect(view.header.tagName).toBe('HEADER');
    expect(view.root.firstElementChild).toBe(view.header);

    expect(view.content).toBeInstanceOf(HTMLElement);
    expect(view.content).toHaveClass('container');

    const main = view.root.querySelector('main.main');
    expect(main).not.toBeNull();
    expect(main?.contains(view.content)).toBe(true);

    expect(view.footer).toBeInstanceOf(HTMLElement);
    expect(view.footer.tagName).toBe('FOOTER');
    expect(view.root.lastElementChild).toBe(view.footer);
  });

  test('exposes header navigation buttons', () => {
    const view = CreateLayoutView();

    expect(view.garageBtn).toBeInstanceOf(HTMLButtonElement);
    expect(view.winnersBtn).toBeInstanceOf(HTMLButtonElement);

    expect(view.garageBtn.type).toBe('button');
    expect(view.winnersBtn.type).toBe('button');

    expect(view.garageBtn.textContent).toBe('Garage');
    expect(view.winnersBtn.textContent).toBe('Winners');
  });

  test('footer contains links and year from FOOTER_CONFIG', () => {
    const view = CreateLayoutView();

    const links =
      view.footer.querySelectorAll<HTMLAnchorElement>('.footer__link');
    expect(links.length).toBe(FOOTER_CONFIG.links.length);

    FOOTER_CONFIG.links.forEach(({ label, href }, idx) => {
      expect(links[idx]).toHaveTextContent(label);
      expect(links[idx]).toHaveAttribute('href', href);
      expect(links[idx]).toHaveAttribute('target', '_blank');
      expect(links[idx]).toHaveAttribute('rel', 'noopener noreferrer');
    });

    const year = view.footer.querySelector('.footer__year');
    expect(year).not.toBeNull();
    expect(year).toHaveTextContent(FOOTER_CONFIG.year);
  });
});
