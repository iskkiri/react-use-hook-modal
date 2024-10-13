import React from 'react';
import { renderHook, act } from '@testing-library/react';
import useModal from '../../hooks/useModal';
import { ModalDispatchProviderWrapper } from '../test-utils';

const TestModalComponent = ({ isOpen }: { isOpen: boolean }) => {
  if (!isOpen) return null;

  return <div>Test Modal</div>;
};

describe('useModal', () => {
  const mockOpenModal = vi.fn();
  const mockCloseModal = vi.fn();

  const wrapper = ModalDispatchProviderWrapper(mockOpenModal, mockCloseModal);

  it('should open the modal when open is called', () => {
    const { result } = renderHook(() => useModal(TestModalComponent), { wrapper });

    act(() => {
      result.current.open({ isOpen: true });
    });

    expect(mockOpenModal).toHaveBeenCalledWith({
      Component: TestModalComponent,
      props: { isOpen: true },
      key: expect.any(String),
      portalTarget: undefined,
    });
  });

  it('should close the modal when close is called', () => {
    const { result } = renderHook(() => useModal(TestModalComponent), { wrapper });

    act(() => {
      result.current.open({ isOpen: true });
    });

    act(() => {
      result.current.close();
    });

    expect(mockCloseModal).toHaveBeenCalledWith(expect.any(String)); // 생성된 key로 닫힘
  });

  it('should use the provided key if options.key is specified', () => {
    const { result } = renderHook(() => useModal(TestModalComponent), { wrapper });

    act(() => {
      result.current.open({ isOpen: true }, { key: 'custom-key' });
    });

    expect(mockOpenModal).toHaveBeenCalledWith({
      Component: TestModalComponent,
      props: { isOpen: true },
      key: 'custom-key',
      portalTarget: undefined,
    });
  });

  it('should call closeModal with the provided key if specified', () => {
    const { result } = renderHook(() => useModal(TestModalComponent), { wrapper });

    act(() => {
      result.current.open({ isOpen: true }, { key: 'custom-key' });
    });

    act(() => {
      result.current.close('custom-key');
    });

    // closeModal이 제공된 key로 호출되었는지 확인
    expect(mockCloseModal).toHaveBeenCalledWith('custom-key');
  });

  it('should open the modal with the provided portalTarget', () => {
    const { result } = renderHook(() => useModal(TestModalComponent), { wrapper });
    const portalTarget = document.createElement('div');

    act(() => {
      result.current.open({ isOpen: true }, { portalTarget });
    });

    expect(mockOpenModal).toHaveBeenCalledWith({
      Component: TestModalComponent,
      props: { isOpen: true },
      key: expect.any(String),
      portalTarget,
    });
  });
});
