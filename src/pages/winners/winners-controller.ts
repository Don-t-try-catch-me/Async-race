import { RenderWinnersRows } from '@/components/winners-table/winner-table-raw';
import type {
  SortKey,
  SortOrder,
  WinnerDto,
  WinnersTableRow,
} from '@/types/type';
import { CreateWinnersView } from './winners-view';
import { WINNER_TABLE_ROWS_PER_PAGE } from '@/constants/constants';
import { clampPage, getTotalPages } from '@/utils/pagination';
import { getWinners } from '@/services/winner-service';
import { getCar } from '@/services/car-service';

export async function CreateWinnersController() {
  let page = 1;
  let winners: WinnerDto[] = [];
  let totalCount = 0;

  const view = CreateWinnersView({ totalWinners: totalCount });

  let sortBy: SortKey = 'id';
  let sortOrder: SortOrder = 'asc';

  const fetchPage = async (): Promise<void> => {
    const data = await getWinners(
      page,
      WINNER_TABLE_ROWS_PER_PAGE,
      sortBy,
      sortOrder
    );
    if (!data) return;

    winners = data.items;
    totalCount = data.totalCount;
  };

  const apply = async (): Promise<void> => {
    if (!Array.isArray(winners)) return;

    const totalPages = getTotalPages(totalCount, WINNER_TABLE_ROWS_PER_PAGE);
    page = clampPage(page, totalPages);

    const start = (page - 1) * WINNER_TABLE_ROWS_PER_PAGE;

    const pageRows: WinnersTableRow[] = await Promise.all(
      winners.map(async (winner, index) => {
        const car = await getCar(winner.id);

        if (!car) {
          return {
            index: start + index + 1,
            carId: winner.id,
            name: 'Unknown',
            color: '#ffffff',
            wins: winner.wins,
            time: winner.time,
          };
        }

        return {
          index: start + index + 1,
          carId: car.id,
          name: car.name,
          color: car.color,
          wins: winner.wins,
          time: winner.time,
        };
      })
    );

    RenderWinnersRows(view.tableBody, pageRows);

    view.total.change(totalCount);

    view.pageLabel.textContent = `Page ${page} / ${totalPages}`;
    view.prevBtn.disabled = page <= 1;
    view.nextBtn.disabled = page >= totalPages;
  };

  const setSort = (key: SortKey): void => {
    if (sortBy === key) {
      sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      sortBy = key;
      sortOrder = 'asc';
    }

    page = 1;

    void (async () => {
      await fetchPage();
      await apply();
    })();
  };

  view.sortIdBtn.addEventListener('click', () => {
    setSort('id');
  });

  view.sortWinsBtn.addEventListener('click', () => {
    setSort('wins');
  });

  view.sortTimeBtn.addEventListener('click', () => {
    setSort('time');
  });

  view.prevBtn.addEventListener('click', () => {
    page -= 1;
    void (async () => {
      await fetchPage();
      await apply();
    })();
  });

  view.nextBtn.addEventListener('click', () => {
    page += 1;
    void (async () => {
      await fetchPage();
      await apply();
    })();
  });

  const updateWinners = async () => {
    await fetchPage();
    await apply();
  };

  await updateWinners();

  return { root: view.root, updateWinners };
}
