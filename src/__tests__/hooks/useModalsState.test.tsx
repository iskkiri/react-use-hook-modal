import { renderHook } from '@testing-library/react';
import useModalsState from '../../hooks/useModalsState';
import { modals, ModalStateProviderWrapper } from '../test-utils';

describe('useModalsState', () => {
  it('should throw an error when used outside ModalProvider', () => {
    const mockInstance = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useModalsState())).toThrowError(
      'ModalProvider is missing or useModalsState must be called within a ModalProvider. Please ensure that your component is wrapped within <ModalProvider>.'
    );

    mockInstance.mockRestore();
  });

  it('should return the current state of modals when used within ModalProvider', () => {
    const { result } = renderHook(() => useModalsState(), {
      wrapper: ModalStateProviderWrapper(modals),
    });

    expect(result.current.modals).toEqual(modals);
  });
});
