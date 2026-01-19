import type { WinnersTableView } from '@/types/type';

function createHeaderCell(label: string): HTMLTableCellElement {
  const th = document.createElement('th');
  th.textContent = label;
  return th;
}

function createSortableHeaderCell(label: string): {
  th: HTMLTableCellElement;
  button: HTMLButtonElement;
} {
  const th = document.createElement('th');
  th.className = 'winners-table__th';

  const wrapper = document.createElement('div');
  wrapper.className = 'winners-table__wrapper winners-table__th-sortable';

  const text = document.createElement('span');
  text.className = 'winners-table__th-text';
  text.textContent = label;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'winners-table__sort-btn';
  button.setAttribute('aria-label', `Sort by ${label}`);

  const icon = document.createElement('span');
  icon.className = 'winners-table__sort-icon';
  icon.setAttribute('aria-hidden', 'true');

  button.append(icon);
  wrapper.append(text, button);
  th.append(wrapper);

  return { th, button };
}

export function createWinnersTableView(): WinnersTableView {
  const root = document.createElement('div');
  root.className = 'winners-table';

  const table = document.createElement('table');
  table.className = 'winners-table__table';

  const thead = document.createElement('thead');

  const headRow = document.createElement('tr');
  const winsHeader = createSortableHeaderCell('Number of Wins');
  const timeHeader = createSortableHeaderCell('Best time');

  headRow.append(
    createHeaderCell('№'),
    createHeaderCell('ID'),
    createHeaderCell('Car'),
    createHeaderCell('Name'),
    winsHeader.th,
    timeHeader.th
  );

  thead.append(headRow);

  const tbody = document.createElement('tbody');
  tbody.className = 'winners-table__body';

  table.append(thead, tbody);
  root.append(table);

  return {
    root,
    tbody,
    sortWinsBtn: winsHeader.button,
    sortTimeBtn: timeHeader.button,
  };
}
