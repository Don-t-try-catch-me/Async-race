import { createElement } from '@/utils/create-element';
import { CreateButton } from '@/components/ui//button/button';

import type { PaginationProperties, PaginationView } from '@/types/type';

export function CreatePaginationView(
  properties: PaginationProperties
): PaginationView {
  const root = createElement('div', { className: 'pagination' });

  const previousButton = CreateButton({
    label: 'Prev',
    variant: 'ghost',
    size: 'sm',
    ariaLabel: 'Previous page',
    dataset: { action: 'page-prev' },
  });

  const nextButton = CreateButton({
    label: 'Next',
    variant: 'ghost',
    size: 'sm',
    ariaLabel: 'Next page',
    dataset: { action: 'page-next' },
  });

  const label = createElement('div', {
    className: 'pagination__label',
    textContent: `Page ${properties.page} / ${properties.totalPages}`,
  });

  root.append(previousButton.root, label, nextButton.root);

  return {
    root,
    prevBtn: previousButton.root,
    nextBtn: nextButton.root,
    label,
  };
}
