import { describe, expect, it, beforeEach } from 'vitest';
import { useUiStore } from '@/stores/ui.store';

describe('ui.store', () => {
  beforeEach(() => {
    useUiStore.setState({ sidebarOpen: true });
  });

  it('toggles the sidebar state', () => {
    expect(useUiStore.getState().sidebarOpen).toBe(true);
    useUiStore.getState().toggleSidebar();
    expect(useUiStore.getState().sidebarOpen).toBe(false);
  });

  it('sets sidebar state explicitly', () => {
    useUiStore.getState().setSidebarOpen(false);
    expect(useUiStore.getState().sidebarOpen).toBe(false);
    useUiStore.getState().setSidebarOpen(true);
    expect(useUiStore.getState().sidebarOpen).toBe(true);
  });
});
