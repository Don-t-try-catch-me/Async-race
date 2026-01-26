import '@testing-library/jest-dom';
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
});
