import { useContext } from 'react';
import { renderHook } from '@testing-library/react';
import { ModalDispatchContext, ModalStateContext } from '../../contexts/ModalContext';
import { ModalStateProviderWrapper } from '../test-utils';

describe('ModalStateContext', () => {
  it('should return null when used without ModalProvider', () => {
    const { result } = renderHook(() => useContext(ModalStateContext));
    expect(result.current).toBeNull();
  });

  it('should return the default modals array when provided with ModalProvider', () => {
    const { result } = renderHook(() => useContext(ModalStateContext), {
      wrapper: ModalStateProviderWrapper([]),
    });
    if (!result.current) throw new Error('ModalStateContext returned null');

    expect(result.current.modals).toEqual([]);
  });
});

describe('ModalDispatchContext', () => {
  const testModalKey = 'test-modal-key';

  it('should throw an error when openModal is called without ModalProvider', () => {
    const { result } = renderHook(() => useContext(ModalDispatchContext));

    const params = {
      Component: (_props: { title: string; isOpen: boolean; close: () => void }) => null,
      props: { title: 'Test Modal', isOpen: true, close: () => {} },
      key: testModalKey,
    };

    expect(() => result.current.openModal(params)).toThrowError(
      'ModalProvider is missing or useModal must be called within a ModalProvider. Please ensure that your component is wrapped within <ModalProvider>.'
    );
  });

  it('should throw an error when closeModal is called without ModalProvider', () => {
    const { result } = renderHook(() => useContext(ModalDispatchContext));

    expect(() => result.current.closeModal({ key: testModalKey })).toThrowError(
      'ModalProvider is missing or useModal must be called within a ModalProvider. Please ensure that your component is wrapped within <ModalProvider>.'
    );
  });

  it('should throw an error when clearModals is called without ModalProvider', () => {
    const { result } = renderHook(() => useContext(ModalDispatchContext));

    expect(() => result.current.clearModals()).toThrowError(
      'ModalProvider is missing or useModal must be called within a ModalProvider. Please ensure that your component is wrapped within <ModalProvider>.'
    );
  });
});
