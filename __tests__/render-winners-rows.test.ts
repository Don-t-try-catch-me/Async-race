import { RenderWinnersRows } from '@/components/winners-table/winner-table-raw';
import type { WinnersTableRow } from '@/types/type';

describe('RenderWinnersRows', () => {
  const makeRows = (): WinnersTableRow[] => [
    {
      index: 1,
      carId: 10,
      name: 'Flash',
      color: '#ff0000',
      wins: 3,
      time: 7.1234,
    },
    {
      index: 2,
      carId: 11,
      name: 'Bolt',
      color: '#00ff00',
      wins: 1,
      time: 10,
    },
  ];

  test('renders correct number of rows and cells', () => {
    const tbody = document.createElement('tbody');

    RenderWinnersRows(tbody, makeRows());

    const trs = tbody.querySelectorAll('tr');
    expect(trs.length).toBe(2);

    for (const tr of Array.from(trs)) {
      const tds = tr.querySelectorAll('td');
      expect(tds.length).toBe(6);
    }
  });

  test('renders values in expected order and formats time', () => {
    const tbody = document.createElement('tbody');
    const rows = makeRows();

    RenderWinnersRows(tbody, rows);

    const first = tbody.querySelectorAll('tr')[0];
    const cells = first.querySelectorAll('td');

    expect(cells[0].textContent).toBe(String(rows[0].index));
    expect(cells[1].textContent).toBe(String(rows[0].carId));

    expect(cells[2]).toHaveClass('winners-table__car-cell');

    expect(cells[3].textContent).toBe(rows[0].name);
    expect(cells[4].textContent).toBe(String(rows[0].wins));
    expect(cells[5].textContent).toBe(`${rows[0].time.toFixed(2)} s`);
  });

  test('replaces previous content (does not append)', () => {
    const tbody = document.createElement('tbody');
    tbody.innerHTML = '<tr><td>old</td></tr>';

    RenderWinnersRows(tbody, makeRows());

    const trs = tbody.querySelectorAll('tr');
    expect(trs.length).toBe(2);
    expect(tbody.textContent).not.toContain('old');
  });

  test('renders empty tbody when rows is empty', () => {
    const tbody = document.createElement('tbody');

    RenderWinnersRows(tbody, []);

    expect(tbody.querySelectorAll('tr').length).toBe(0);
  });

  test('matches snapshot', () => {
    const tbody = document.createElement('tbody');

    RenderWinnersRows(tbody, makeRows());

    expect(tbody).toMatchSnapshot();
  });
});
