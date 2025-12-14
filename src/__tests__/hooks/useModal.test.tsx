import React from 'react';
import { renderHook, act } from '@testing-library/react';
import useModal from '../../hooks/useModal';
import { ModalDispatchProviderWrapper } from '../test-utils';
import type { CloseModal } from '../../types/modal';

const TestModalComponent = ({ isOpen }: { isOpen: boolean; close: CloseModal }) => {
  if (!isOpen) return null;

  return <div>Test Modal</div>;
};

describe('useModal', () => {
  const mockOpenModal = vi.fn();
  const mockCloseModal = vi.fn();
  const mockUpdateModal = vi.fn();
  const mockClearModals = vi.fn();

  const wrapper = ModalDispatchProviderWrapper(mockOpenModal, mockCloseModal, mockUpdateModal, mockClearModals);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should open the modal when open is called', () => {
    const { result } = renderHook(() => useModal(TestModalComponent), { wrapper });

    act(() => result.current.open());

    expect(mockOpenModal).toHaveBeenCalledWith({
      Component: TestModalComponent,
      props: { isOpen: true, close: expect.any(Function) },
      key: expect.any(String),
      portalTarget: undefined,
    });
  });

  it('should close the modal when close is called', () => {
    const { result } = renderHook(() => useModal(TestModalComponent), { wrapper });

    act(() => result.current.open());

    act(() => result.current.close());

    expect(mockCloseModal).toHaveBeenCalledWith({ key: expect.any(String) });
  });

  it('should use the provided key if options.key is specified', () => {
    const { result } = renderHook(() => useModal(TestModalComponent), { wrapper });

    act(() => result.current.open({}, { key: 'custom-key' }));

    expect(mockOpenModal).toHaveBeenCalledWith({
      Component: TestModalComponent,
      props: { isOpen: true, close: expect.any(Function) },
      key: 'custom-key',
      portalTarget: undefined,
    });
  });

  it('should call closeModal with the provided key if specified', () => {
    const { result } = renderHook(() => useModal(TestModalComponent), { wrapper });

    act(() => result.current.open({}, { key: 'custom-key' }));

    act(() => result.current.close({ key: 'custom-key' }));

    expect(mockCloseModal).toHaveBeenCalledWith({ key: 'custom-key' });
  });

  it('should open the modal with the provided portalTarget', () => {
    const { result } = renderHook(() => useModal(TestModalComponent), { wrapper });
    const portalTarget = document.createElement('div');

    act(() => result.current.open({}, { portalTarget }));

    expect(mockOpenModal).toHaveBeenCalledWith({
      Component: TestModalComponent,
      props: { isOpen: true, close: expect.any(Function) },
      key: expect.any(String),
      portalTarget,
    });
  });

  it('should update modal props when update is called', () => {
    const { result } = renderHook(() => useModal(TestModalComponent), { wrapper });

    act(() => result.current.update({ title: 'Updated Title' }));

    expect(mockUpdateModal).toHaveBeenCalledWith({
      key: expect.any(String),
      props: { title: 'Updated Title' },
    });
  });

  it('should call updateModal with the provided key if specified', () => {
    const { result } = renderHook(() => useModal(TestModalComponent), { wrapper });

    act(() => result.current.update({ title: 'Updated Title' }, { key: 'custom-key' }));

    expect(mockUpdateModal).toHaveBeenCalledWith({
      key: 'custom-key',
      props: { title: 'Updated Title' },
    });
  });
});
