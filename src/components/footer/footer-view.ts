import { createElement } from '@/utils/create-element';
import type { FooterLink, FooterView } from '@/types/type';

function CreateFooterLink(label: string, href: string): HTMLAnchorElement {
  return createElement('a', {
    className: 'footer__link',
    textContent: label,
    attrs: {
      href,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  });
}

export function CreateFooterView(parameters: {
  links: readonly FooterLink[];
  year: string;
}): FooterView {
  const root = createElement('footer', { className: 'footer' });

  const inner = createElement('div', { className: 'container footer__inner' });

  const linksWrap = createElement('div', { className: 'footer__links' });

  for (const { label, href } of parameters.links) {
    linksWrap.append(CreateFooterLink(label, href));
  }

  const year = createElement('div', {
    className: 'footer__year',
    textContent: parameters.year,
  });

  inner.append(linksWrap, year);
  root.append(inner);

  return { root };
}
