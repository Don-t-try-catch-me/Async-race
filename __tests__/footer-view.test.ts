import { CreateFooterView } from '@/components/footer/footer-view';

describe('CreateFooterView', () => {
  test('matches snapshot', () => {
    const view = CreateFooterView({
      links: [
        { label: 'RS School', href: 'https://rs.school/' },
        { label: 'GitHub', href: 'https://github.com/' },
      ],
      year: '2026',
    });

    expect(view.root).toMatchSnapshot();
  });
});
