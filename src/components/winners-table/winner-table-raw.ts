import { createElement } from '@/utils/create-element';
import type { WinnersTableRow } from '@/types/type';

function createTd(text: string): HTMLTableCellElement {
  return createElement('td', { textContent: text });
}
function formatTime(seconds: number): string {
  return `${seconds.toFixed(2)} s`;
}

function createCarMaskIcon(color: string): HTMLElement {
  const icon = createElement('span', { className: 'winners-table__car-icon' });
  icon.style.backgroundColor = color;
  return icon;
}

export function RenderWinnersRows(
  tbody: HTMLTableSectionElement,
  rows: WinnersTableRow[]
): void {
  const fragment = document.createDocumentFragment();

  for (const row of rows) {
    const tr = createElement('tr');

    tr.append(createTd(String(row.index)));

    tr.append(createTd(String(row.carId)));

    const carTd = createElement('td', { className: 'winners-table__car-cell' });
    carTd.append(createCarMaskIcon(row.color));
    tr.append(carTd);

    tr.append(createTd(row.name));
    tr.append(createTd(String(row.wins)));
    tr.append(createTd(formatTime(row.time)));

    fragment.append(tr);
  }

  tbody.replaceChildren(fragment);
}
