import type { FooterLink, FooterView } from '@/types/type';

function createFooterLink(label: string, href: string): HTMLAnchorElement {
  const link = document.createElement('a');
  link.className = 'footer__link';
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = label;
  return link;
}

export function createFooterView(parameters: {
  links: FooterLink[];
  year: string;
}): FooterView {
  const root = document.createElement('footer');
  root.className = 'footer';

  const inner = document.createElement('div');
  inner.className = 'container footer__inner';

  const linksWrap = document.createElement('div');
  linksWrap.className = 'footer__links';

  for (const { label, href } of parameters.links) {
    linksWrap.append(createFooterLink(label, href));
  }

  const year = document.createElement('div');
  year.className = 'footer__year';
  year.textContent = parameters.year;

  inner.append(linksWrap, year);
  root.append(inner);

  return { root };
}
