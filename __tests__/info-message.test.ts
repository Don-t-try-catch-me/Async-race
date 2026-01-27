import { CreateInfoMessage } from '@/components/ui/info-message/info-message';

describe('CreateInfoMessage', () => {
  test('renders with default variant when variant is not provided', () => {
    const view = CreateInfoMessage({ text: 'Hello' });

    expect(view.root).toHaveClass('info-message', 'info-message--default');
    expect(view.root.getAttribute('role')).toBe('status');
    expect(view.root.getAttribute('aria-live')).toBe('polite');

    const text = view.root.querySelector('.info-message__text');
    expect(text).not.toBeNull();
    expect(text?.textContent).toBe('Hello');
  });

  test('renders with provided variant', () => {
    const view = CreateInfoMessage({ text: 'Loading...', variant: 'loading' });

    expect(view.root).toHaveClass('info-message', 'info-message--loading');
    expect(view.root).not.toHaveClass('info-message--default');
  });

  test('setText updates message text', () => {
    const view = CreateInfoMessage({ text: 'Initial' });

    view.setText('Updated');

    const text = view.root.querySelector('.info-message__text');
    expect(text?.textContent).toBe('Updated');
  });

  test('setVariant switches variant class and removes previous variant classes', () => {
    const view = CreateInfoMessage({ text: 'Msg', variant: 'default' });

    view.setVariant('winner');
    expect(view.root).toHaveClass('info-message--winner');
    expect(view.root).not.toHaveClass('info-message--default');
    expect(view.root).not.toHaveClass('info-message--loading');
    expect(view.root).not.toHaveClass('info-message--error');

    view.setVariant('error');
    expect(view.root).toHaveClass('info-message--error');
    expect(view.root).not.toHaveClass('info-message--winner');
  });

  test('matches snapshot', () => {
    const view = CreateInfoMessage({ text: 'Winner!', variant: 'winner' });
    expect(view.root).toMatchSnapshot();
  });
});
