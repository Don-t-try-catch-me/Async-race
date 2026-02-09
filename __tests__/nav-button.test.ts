import { CreateNavButton } from '@/components/ui/nav-button/nav-button';

describe('CreateNavButton', () => {
  test('renders button with default className', () => {
    const btn = CreateNavButton({ label: 'Garage' });

    expect(btn.tagName).toBe('BUTTON');
    expect(btn).toHaveClass('nav__btn');
    expect(btn.textContent).toBe('Garage');
    expect(btn.type).toBe('button');
  });

  test('uses provided className', () => {
    const btn = CreateNavButton({
      label: 'Winners',
      className: 'nav__btn is-active',
    });

    expect(btn).toHaveClass('nav__btn');
    expect(btn).toHaveClass('is-active');
    expect(btn.textContent).toBe('Winners');
    expect(btn.type).toBe('button');
  });

  test('does not set aria-label by default', () => {
    const btn = CreateNavButton({ label: 'Go' });

    expect(btn.getAttribute('aria-label')).toBeNull();
  });

  test('creates independent instances', () => {
    const a = CreateNavButton({ label: 'A' });
    const b = CreateNavButton({ label: 'B' });

    expect(a).not.toBe(b);
    expect(a.textContent).toBe('A');
    expect(b.textContent).toBe('B');
  });
});
