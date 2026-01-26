import { CreateButton } from '@/components/ui/button/button';

describe('CreateButton', () => {
  test('renders button with default props', () => {
    const { root } = CreateButton({ label: 'Click' });

    expect(root.tagName).toBe('BUTTON');
    expect(root).toHaveClass('btn', 'btn-default', 'btn-md');
    expect(root.textContent).toBe('Click');

    expect(root.type).toBe('button');
    expect(root.disabled).toBe(false);
    expect(root.getAttribute('aria-label')).toBeNull();
  });

  test('applies custom variant and size', () => {
    const { root } = CreateButton({
      label: 'Start',
      variant: 'success',
      size: 'sm',
    });

    expect(root).toHaveClass('btn', 'btn-success', 'btn-sm');
    expect(root).not.toHaveClass('btn-default', 'btn-md');
  });

  test('sets disabled=true when provided', () => {
    const { root } = CreateButton({
      label: 'Disabled',
      disabled: true,
    });

    expect(root.disabled).toBe(true);
  });

  test('sets aria-label when ariaLabel is provided', () => {
    const { root } = CreateButton({
      label: 'Reset',
      ariaLabel: 'Reset race',
    });

    expect(root.getAttribute('aria-label')).toBe('Reset race');
  });

  test('does not set aria-label when ariaLabel is not provided', () => {
    const { root } = CreateButton({
      label: 'No aria',
    });

    expect(root.hasAttribute('aria-label')).toBe(false);
  });

  test('sets dataset attributes when dataset is provided', () => {
    const { root } = CreateButton({
      label: 'Race',
      dataset: { action: 'race-start', id: '42' },
    });

    expect(root.dataset.action).toBe('race-start');
    expect(root.dataset.id).toBe('42');
  });

  test('does not add dataset when dataset is not provided', () => {
    const { root } = CreateButton({
      label: 'Plain',
    });

    expect(root.dataset.action).toBeUndefined();
    expect(root.dataset.id).toBeUndefined();
  });

  test('keeps label as textContent exactly', () => {
    const { root } = CreateButton({ label: '  Click me  ' });
    expect(root.textContent).toBe('  Click me  ');
  });
});
