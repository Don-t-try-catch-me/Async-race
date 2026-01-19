import type { WinnersView, WinnersViewProperties } from '@/types/type';
import { createTotalCounter } from '@/components/ui/total-counter/total-counter';
import { createWinnersTableView } from '@/components/winners-table/winners-table-view';
import { createPaginationView } from '@/components/ui/pagination/pagination-view';

export function createWinnersView(
  properties: WinnersViewProperties
): WinnersView {
  const root = document.createElement('section');
  root.className = 'page page-winners';

  const total = createTotalCounter({
    label: 'winners',
    count: properties.totalWinners,
  });

  const table = createWinnersTableView();

  const pagination = createPaginationView({ page: 1, totalPages: 1 });

  root.append(total, table.root, pagination.root);

  return {
    root,
    tableBody: table.tbody,
    sortWinsBtn: table.sortWinsBtn,
    sortTimeBtn: table.sortTimeBtn,
    prevBtn: pagination.prevBtn,
    nextBtn: pagination.nextBtn,
    pageLabel: pagination.label,
  };
}
