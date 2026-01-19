import { CreateNavButton } from '@/components/ui/nav-button/nav-button';
import type { PaginationProperties, PaginationView } from '@/types/type';
import { createElement } from '@/utils/create-element';

export function CreatePaginationView(
  properties: PaginationProperties
): PaginationView {
  const root = createElement('div', { className: 'pagination' });

  const previousButton = CreateNavButton({ label: 'Prev' });
  const nextButton = CreateNavButton({ label: 'Next' });

  const label = createElement('div', {
    className: 'pagination__label',
    textContent: `Page ${properties.page} / ${properties.totalPages}`,
  });

  root.append(previousButton, label, nextButton);

  return { root, prevBtn: previousButton, nextBtn: nextButton, label };
}
