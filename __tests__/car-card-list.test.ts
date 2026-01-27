import { CreateCarCardList } from '@/components/car-card-list/car-card-list';

describe('CreateCarCardList', () => {
  test('renders ul with correct class', () => {
    const view = CreateCarCardList();

    expect(view.root.tagName).toBe('UL');
    expect(view.root).toHaveClass('car-list');
  });

  test('returns only root element', () => {
    const view = CreateCarCardList();

    expect(Object.keys(view)).toEqual(['root']);
  });
});
