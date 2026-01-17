import type { WinnersView, WinnersViewProperties } from '@/types/type';
import { createTotalCounter } from '@/components/ui/total-counter/total-counter';
import { createWinnersTableView } from '@/components/winners-table/winners-table-view';

export function createWinnersView(
  properties: WinnersViewProperties
): WinnersView {
  const root = document.createElement('section');
  root.className = 'page page-winners';

  const title = document.createElement('h1');
  title.className = 'page__title';
  title.textContent = 'Winners';

  const total = createTotalCounter({
    label: 'winners',
    count: properties.totalWinners,
  });

  const table = createWinnersTableView();

  root.append(title, total, table.root);

  return {
    root,
    tableBody: table.tbody,
    sortWinsBtn: table.sortWinsBtn,
    sortTimeBtn: table.sortTimeBtn,
  };
}
