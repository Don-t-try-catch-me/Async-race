import { createElement } from '@/utils/create-element';
import { CreateTotalCounter } from '@/components/ui/total-counter/total-counter';
import { CreateWinnersTableView } from '@/components/winners-table/winners-table-view';
import { CreatePaginationView } from '@/components/ui/pagination/pagination-view';
import type { WinnersView, WinnersViewProperties } from '@/types/type';

export function CreateWinnersView(
  properties: WinnersViewProperties
): WinnersView {
  const root = createElement('section', { className: 'page page-winners' });

  const total = CreateTotalCounter({
    label: 'winners',
    count: properties.totalWinners,
  });

  const table = CreateWinnersTableView();

  const pagination = CreatePaginationView({ page: 1, totalPages: 1 });

  root.append(total.root, table.root, pagination.root);

  return {
    root,
    tableBody: table.tbody,
    sortIdBtn: table.sortIdBtn,
    sortWinsBtn: table.sortWinsBtn,
    sortTimeBtn: table.sortTimeBtn,
    prevBtn: pagination.prevBtn,
    nextBtn: pagination.nextBtn,
    pageLabel: pagination.label,
    total,
  };
}
