import { createElement } from '@/utils/create-element';
import type { WinnersTableView } from '@/types/type';

function CreateHeaderCell(label: string): HTMLTableCellElement {
  return createElement('th', { textContent: label });
}

function CreateSortableHeaderCell(label: string): {
  th: HTMLTableCellElement;
  button: HTMLButtonElement;
} {
  const icon = createElement('span', {
    className: 'winners-table__sort-icon',
    attrs: { 'aria-hidden': 'true' },
  });

  const button = createElement('button', {
    className: 'winners-table__sort-btn',
    attrs: { type: 'button', 'aria-label': `Sort by ${label}` },
    children: [icon],
  });

  const text = createElement('span', {
    className: 'winners-table__th-text',
    textContent: label,
  });

  const wrapper = createElement('div', {
    className: 'winners-table__wrapper winners-table__th-sortable',
    children: [text, button],
  });

  const th = createElement('th', {
    className: 'winners-table__th',
    children: [wrapper],
  });

  return { th, button };
}

export function CreateWinnersTableView(): WinnersTableView {
  const root = createElement('div', { className: 'winners-table' });

  const table = createElement('table', { className: 'winners-table__table' });

  const thead = createElement('thead');

  const headRow = createElement('tr');

  const winsHeader = CreateSortableHeaderCell('Number of Wins');
  const timeHeader = CreateSortableHeaderCell('Best time');

  headRow.append(
    CreateHeaderCell('№'),
    CreateHeaderCell('ID'),
    CreateHeaderCell('Car'),
    CreateHeaderCell('Name'),
    winsHeader.th,
    timeHeader.th
  );

  thead.append(headRow);

  const tbody = createElement('tbody', { className: 'winners-table__body' });

  table.append(thead, tbody);
  root.append(table);

  return {
    root,
    tbody,
    sortWinsBtn: winsHeader.button,
    sortTimeBtn: timeHeader.button,
  };
}
