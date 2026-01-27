import { CreatePaginationView } from '@/components/ui/pagination/pagination-view';

describe('CreatePaginationView', () => {
  test('renders root container and label', () => {
    const view = CreatePaginationView({ page: 2, totalPages: 7 });

    expect(view.root.tagName).toBe('DIV');
    expect(view.root).toHaveClass('pagination');

    expect(view.label.tagName).toBe('DIV');
    expect(view.label).toHaveClass('pagination__label');
    expect(view.label.textContent).toBe('Page 2 / 7');
  });

  test('renders Prev/Next buttons with correct props', () => {
    const view = CreatePaginationView({ page: 1, totalPages: 1 });

    expect(view.prevBtn.tagName).toBe('BUTTON');
    expect(view.prevBtn).toHaveClass('btn', 'btn-ghost', 'btn-sm');
    expect(view.prevBtn.textContent).toBe('Prev');
    expect(view.prevBtn.type).toBe('button');
    expect(view.prevBtn.getAttribute('aria-label')).toBe('Previous page');
    expect(view.prevBtn.dataset.action).toBe('page-prev');

    expect(view.nextBtn.tagName).toBe('BUTTON');
    expect(view.nextBtn).toHaveClass('btn', 'btn-ghost', 'btn-sm');
    expect(view.nextBtn.textContent).toBe('Next');
    expect(view.nextBtn.type).toBe('button');
    expect(view.nextBtn.getAttribute('aria-label')).toBe('Next page');
    expect(view.nextBtn.dataset.action).toBe('page-next');
  });

  test('appends children in correct order: Prev, label, Next', () => {
    const view = CreatePaginationView({ page: 3, totalPages: 10 });

    const children = Array.from(view.root.children);

    expect(children).toHaveLength(3);
    expect(children[0]).toBe(view.prevBtn);
    expect(children[1]).toBe(view.label);
    expect(children[2]).toBe(view.nextBtn);
  });

  test('exposes references from returned object', () => {
    const view = CreatePaginationView({ page: 5, totalPages: 6 });

    expect(view.root.contains(view.prevBtn)).toBe(true);
    expect(view.root.contains(view.label)).toBe(true);
    expect(view.root.contains(view.nextBtn)).toBe(true);
  });
});
