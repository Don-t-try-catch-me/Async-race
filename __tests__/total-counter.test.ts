import { CreateTotalCounter } from '@/components/ui/total-counter/total-counter';

describe('CreateTotalCounter', () => {
  test('renders initial text and className', () => {
    const counter = CreateTotalCounter({ label: 'cars', count: 10 });

    expect(counter.root.tagName).toBe('P');
    expect(counter.root).toHaveClass('page__subtitle');
    expect(counter.root.textContent).toBe('Total cars: 10');
  });

  test('updates text via change()', () => {
    const counter = CreateTotalCounter({ label: 'winners', count: 0 });

    counter.change(25);

    expect(counter.root.textContent).toBe('Total winners: 25');
  });

  test('change() does not affect className', () => {
    const counter = CreateTotalCounter({ label: 'cars', count: 1 });

    counter.change(2);

    expect(counter.root).toHaveClass('page__subtitle');
  });
});
