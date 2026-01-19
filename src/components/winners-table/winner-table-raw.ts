import type { WinnersTableRow } from '@/types/type';

function createTd(text: string): HTMLTableCellElement {
  const td = document.createElement('td');
  td.textContent = text;
  return td;
}

function formatTime(seconds: number): string {
  return `${seconds.toFixed(2)} s`;
}

function createCarMaskIcon(color: string): HTMLElement {
  const icon = document.createElement('span');
  icon.className = 'winners-table__car-icon';
  icon.style.backgroundColor = color;
  return icon;
}

export function renderWinnersRows(
  tbody: HTMLTableSectionElement,
  rows: WinnersTableRow[]
): void {
  const fragment = document.createDocumentFragment();

  for (const row of rows) {
    const tr = document.createElement('tr');

    tr.append(createTd(String(row.index)));

    tr.append(createTd(String(row.carId)));

    const carTd = document.createElement('td');
    carTd.className = 'winners-table__car-cell';
    carTd.append(createCarMaskIcon(row.color));
    tr.append(carTd);

    tr.append(createTd(row.name));

    tr.append(createTd(String(row.wins)));

    tr.append(createTd(formatTime(row.time)));

    fragment.append(tr);
  }

  tbody.replaceChildren(fragment);
}
