import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import useModalStatus from '../../hooks/useModalStatus';
import { ModalStateProviderWrapper } from '../test-utils';
import { useState, useEffect } from 'react';
import { ModalStateContext } from '../../contexts/ModalContext';
import useModal from '../../hooks/useModal';
import ModalProvider from '../../contexts/ModalProvider';

describe('useModalStatus', () => {
  it('should throw an error when used outside ModalProvider', () => {
    const mockInstance = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useModalStatus({ key: 'test-modal' }))).toThrowError(
      'ModalProvider is missing or useModalStatus must be called within a ModalProvider. Please ensure that your component is wrapped within <ModalProvider>.'
    );

    mockInstance.mockRestore();
  });

  it('should return correct isOpen status for existing modal', () => {
    const { result } = renderHook(() => useModalStatus({ key: 'test-modal' }), {
      wrapper: ModalStateProviderWrapper([
        { key: 'test-modal', props: { isOpen: true }, Component: () => null },
      ]),
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('should return false for non-existing modal', () => {
    const { result } = renderHook(() => useModalStatus({ key: 'non-existing-modal' }), {
      wrapper: ModalStateProviderWrapper([
        { key: 'other-modal', props: { isOpen: true }, Component: () => null },
      ]),
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should update isOpen status when modal state changes', async () => {
    const TestWrapper = ({ children }: { children: React.ReactNode }) => {
      const [modals, setModals] = useState([
        { key: 'test-modal', props: { isOpen: false }, Component: () => null },
      ]);

      useEffect(() => {
        // Simulate modal state update
        setTimeout(() => {
          setModals([{ key: 'test-modal', props: { isOpen: true }, Component: () => null }]);
        }, 0);
      }, []);

      return <ModalStateContext.Provider value={{ modals }}>{children}</ModalStateContext.Provider>;
    };

    const { result } = renderHook(() => useModalStatus({ key: 'test-modal' }), {
      wrapper: TestWrapper,
    });

    expect(result.current.isOpen).toBe(false);

    await waitFor(() => {
      expect(result.current.isOpen).toBe(true);
    });
  });

  it('should reflect modal close state correctly', async () => {
    const TestComponent = () => {
      const modal = useModal(() => null);
      const modalStatus = useModalStatus({ key: 'test-modal' });
      return { modal, modalStatus };
    };

    const { result } = renderHook(() => TestComponent(), {
      wrapper: ({ children }) => <ModalProvider>{children}</ModalProvider>,
    });

    expect(result.current.modalStatus.isOpen).toBe(false);

    act(() => {
      result.current.modal.open({ isOpen: true }, { key: 'test-modal' });
    });

    await waitFor(() => {
      expect(result.current.modalStatus.isOpen).toBe(true);
    });

    act(() => {
      result.current.modal.close({ key: 'test-modal' });
    });

    await waitFor(() => {
      expect(result.current.modalStatus.isOpen).toBe(false);
    });
  });
});
