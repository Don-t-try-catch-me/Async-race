import { CreateHeaderView } from '@/components/header/header-view';
import { CreateFooterView } from '@/components/footer/footer-view';
import { createElement } from '@/utils/create-element';
import type { LayoutView } from '@/types/type';
import { FOOTER_CONFIG } from '@/constants/constants';

export function CreateLayoutView(): LayoutView {
  const root = createElement('div', { className: 'layout' });

  const headerView = CreateHeaderView();

  const content = createElement('div', { className: 'container' });

  const main = createElement('main', {
    className: 'main',
    children: [content],
  });

  const footerView = CreateFooterView(FOOTER_CONFIG);

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
