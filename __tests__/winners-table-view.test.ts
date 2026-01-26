import { CreateWinnersTableView } from '@/components/winners-table/winners-table-view';

describe('CreateWinnersTableView', () => {
  test('renders winners table structure with header cells and tbody', () => {
    const view = CreateWinnersTableView();

    expect(view.root).toBeInstanceOf(HTMLElement);
    expect(view.root).toHaveClass('winners-table');

    const table = view.root.querySelector('table.winners-table__table');
    expect(table).not.toBeNull();

    const thead = table!.querySelector('thead');
    const tbody = table!.querySelector('tbody.winners-table__body');

    expect(thead).not.toBeNull();
    expect(tbody).not.toBeNull();
    expect(view.tbody).toBe(tbody);

    const headerCells = Array.from(thead!.querySelectorAll('th')).map((th) =>
      th.textContent?.trim()
    );

    expect(headerCells).toEqual([
      '№',
      'ID',
      'Car',
      'Name',
      'Number of Wins',
      'Best time',
    ]);
  });

  test('exposes sort buttons for id, wins, time with correct aria-labels', () => {
    const view = CreateWinnersTableView();

    expect(view.sortIdBtn.tagName).toBe('BUTTON');
    expect(view.sortWinsBtn.tagName).toBe('BUTTON');
    expect(view.sortTimeBtn.tagName).toBe('BUTTON');

    expect(view.sortIdBtn).toHaveClass('winners-table__sort-btn');
    expect(view.sortWinsBtn).toHaveClass('winners-table__sort-btn');
    expect(view.sortTimeBtn).toHaveClass('winners-table__sort-btn');

    expect(view.sortIdBtn.getAttribute('type')).toBe('button');
    expect(view.sortWinsBtn.getAttribute('type')).toBe('button');
    expect(view.sortTimeBtn.getAttribute('type')).toBe('button');

    expect(view.sortIdBtn.getAttribute('aria-label')).toBe('Sort by ID');
    expect(view.sortWinsBtn.getAttribute('aria-label')).toBe(
      'Sort by Number of Wins'
    );
    expect(view.sortTimeBtn.getAttribute('aria-label')).toBe(
      'Sort by Best time'
    );
  });

  test('sortable headers contain a sort icon marked aria-hidden', () => {
    const view = CreateWinnersTableView();

    const icons = view.root.querySelectorAll<HTMLSpanElement>(
      '.winners-table__sort-btn .winners-table__sort-icon'
    );
    expect(icons.length).toBe(3);

    icons.forEach((icon) => {
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });
  });

  test('matches snapshot', () => {
    const view = CreateWinnersTableView();
    expect(view.root).toMatchSnapshot();
  });
});
