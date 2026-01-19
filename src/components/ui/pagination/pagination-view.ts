import type { PaginationProperties, PaginationView } from '@/types/type';

function createNavButton(label: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'pagination__btn';
  button.textContent = label;
  return button;
}

export function createPaginationView(
  properties: PaginationProperties
): PaginationView {
  const root = document.createElement('div');
  root.className = 'pagination';

  const previousButton = createNavButton('Prev');
  const nextButton = createNavButton('Next');

  const label = document.createElement('div');
  label.className = 'pagination__label';
  label.textContent = `Page ${properties.page} / ${properties.totalPages}`;

  root.append(previousButton, label, nextButton);

  return { root, prevBtn: previousButton, nextBtn: nextButton, label };
}
