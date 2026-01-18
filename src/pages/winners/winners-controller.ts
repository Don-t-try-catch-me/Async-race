import { renderWinnersRows } from '@/components/winners-table/winner-table-raw';
import type { SortKey, SortState, WinnersTableRow } from '@/types/type';
import { getCarByIdMock } from './mocks-api';
import { winnersMock } from './mocks-winners';
import { createWinnersView } from './winners-view';
import { WINNER_TABLE_ROWS_PER_PAGE } from '@/constants/constants';
import { clampPage, getTotalPages } from '@/utils/pagination';

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
  let page = 1;

  const apply = (): void => {
    const sorted = sortRows(rows, sortState);

    const totalPages = getTotalPages(sorted.length, WINNER_TABLE_ROWS_PER_PAGE);
    page = clampPage(page, totalPages);

    const start = (page - 1) * WINNER_TABLE_ROWS_PER_PAGE;
    const end = start + WINNER_TABLE_ROWS_PER_PAGE;

    const pageRows: WinnersTableRow[] = sorted
      .slice(start, end)
      .map((row, index) => ({
        ...row,
        index: start + index + 1,
      }));

    renderWinnersRows(view.tableBody, pageRows);

    view.pageLabel.textContent = `Page ${page} / ${totalPages}`;
    view.prevBtn.disabled = page <= 1;
    view.nextBtn.disabled = page >= totalPages;
  };

  view.sortWinsBtn.addEventListener('click', () => {
    sortState = nextSortState(sortState, 'wins');
    page = 1;
    apply();
  });

  view.sortTimeBtn.addEventListener('click', () => {
    sortState = nextSortState(sortState, 'time');
    page = 1;
    apply();
  });

  view.prevBtn.addEventListener('click', () => {
    page -= 1;
    apply();
  });

  view.nextBtn.addEventListener('click', () => {
    page += 1;
    apply();
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

    apply();
  })();

  return view.root;
}
