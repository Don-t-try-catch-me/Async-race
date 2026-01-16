import { createHeaderView } from '@/components/header/header-view';
import { createFooterView } from '@/components/footer/footer-view';
import type { LayoutView } from '@/types/type';

export function createLayoutView(): LayoutView {
  const root = document.createElement('div');
  root.className = 'layout';

  const headerView = createHeaderView();

  const main = document.createElement('main');
  main.className = 'main';

  const content = document.createElement('div');
  content.className = 'container';
  main.append(content);

  const footerView = createFooterView({
    links: [
      {
        label: 'Timofey Naryshkin',
        href: 'https://github.com/TimofeyNaryshkin',
      },
      {
        label: 'Natasha Solntseva',
        href: 'https://github.com/NatashaSolntseva',
      },
    ],
    year: '2025',
  });

  root.append(headerView.root, main, footerView.root);

  return {
    root,
    header: headerView.root,
    content,
    footer: footerView.root,
    garageBtn: headerView.garageBtn,
    winnersBtn: headerView.winnersBtn,
  };
}
