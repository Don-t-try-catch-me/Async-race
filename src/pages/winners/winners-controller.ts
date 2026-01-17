import { renderWinnersRows } from '@/components/winners-table/winner-table-raw';
import type { SortKey, SortState, WinnersTableRow } from '@/types/type';
import { getCarByIdMock } from './mocks-api';
import { winnersMock } from './mocks-winners';
import { createWinnersView } from './winners-view';

function nextSortState(current: SortState, key: SortKey): SortState {
  if (!current || current.key !== key) return { key, order: 'asc' };
  return { key, order: current.order === 'asc' ? 'desc' : 'asc' };
}

function sortRows(
  rows: WinnersTableRow[],
  state: SortState
): WinnersTableRow[] {
  if (!state) return [...rows];

  const sorted = [...rows];
  if (state.key === 'wins') {
    sorted.sort((a, b) =>
      state.order === 'asc' ? a.wins - b.wins : b.wins - a.wins
    );
  } else {
    sorted.sort((a, b) =>
      state.order === 'asc' ? a.time - b.time : b.time - a.time
    );
  }

  return sorted;
}

export function createWinnersController(): HTMLElement {
  const view = createWinnersView({ totalWinners: winnersMock.length });

  let rows: WinnersTableRow[] = [];
  let sortState: SortState = undefined;

  const applySortAndRender = (): void => {
    const sorted = sortRows(rows, sortState);

    const viewRows: WinnersTableRow[] = sorted.map((row, index) => ({
      ...row,
      index: index + 1,
    }));

    renderWinnersRows(view.tableBody, viewRows);
  };

  view.sortWinsBtn.addEventListener('click', () => {
    sortState = nextSortState(sortState, 'wins');
    applySortAndRender();
  });

  view.sortTimeBtn.addEventListener('click', () => {
    sortState = nextSortState(sortState, 'time');
    applySortAndRender();
  });

  void (async () => {
    rows = await Promise.all(
      winnersMock.map(async (winner, index) => {
        const car = await getCarByIdMock(winner.id);

        return {
          index: index + 1,
          carId: car.id,
          name: car.name,
          color: car.color,
          wins: winner.wins,
          time: winner.time,
        };
      })
    );

    applySortAndRender();
  })();

  return view.root;
}
