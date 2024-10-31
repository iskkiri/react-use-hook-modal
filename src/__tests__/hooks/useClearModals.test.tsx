import React, { useCallback } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalProvider from '../../contexts/ModalProvider';
import useModal from '../../hooks/useModal';
import useClearModals from '../../hooks/useClearModals';
import useModalsState from '../../hooks/useModalsState';

interface TestModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const TestModal = ({ isOpen, onClose, title }: TestModalProps) => {
  if (!isOpen) return null;

  return (
    <div role="dialog">
      <p>{title ?? 'Test Modal'}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

describe('useClearModals', () => {
  it('should close all modals immediately and remove only those with isOpen as false after clearTime', async () => {
    const CLEAR_TIME = 1000;

    const TestComponent = () => {
      const { modals } = useModalsState();
      const { open, close } = useModal(TestModal);
      const { clearModals } = useClearModals();

      const onOpenFirstModal = useCallback(
        () => open({ onClose: close, title: 'First Modal' }, { key: 'modal-1' }),
        [open, close]
      );
      const onOpenSecondModal = useCallback(
        () => open({ onClose: close, title: 'Second Modal' }, { key: 'modal-2' }),
        [open, close]
      );

      return (
        <div>
          <button onClick={onOpenFirstModal}>Open First Modal</button>
          <button onClick={onOpenSecondModal}>Open Second Modal</button>
          <button onClick={clearModals}>Clear All Modals</button>
          <p>Modals count: {modals.length}</p>
        </div>
      );
    };

    render(
      <ModalProvider clearTime={CLEAR_TIME}>
        <TestComponent />
      </ModalProvider>
    );

    userEvent.click(screen.getByText('Open First Modal'));
    expect(await screen.findByText('First Modal')).toBeInTheDocument();

    userEvent.click(screen.getByText('Open Second Modal'));
    expect(await screen.findByText('Second Modal')).toBeInTheDocument();

    userEvent.click(screen.getByText('Clear All Modals'));
    await waitFor(() => {
      expect(screen.queryByText('First Modal')).not.toBeInTheDocument();
      expect(screen.queryByText('Second Modal')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Modals count: 2')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('Modals count: 0')).toBeInTheDocument(), {
      timeout: CLEAR_TIME + 100,
    });
  });

  it('should retain the reopened modal in state if reopened before clearTime when clearModals is called', async () => {
    const CLEAR_TIME = 1000;

    const TestComponent = () => {
      const { modals } = useModalsState();
      const { open } = useModal(TestModal);
      const { clearModals } = useClearModals();

      const onOpenFirstModal = useCallback(
        () => open({ onClose: () => {}, title: 'First Modal' }, { key: 'modal-1' }),
        [open]
      );
      const onOpenSecondModal = useCallback(
        () => open({ onClose: () => {}, title: 'Second Modal' }, { key: 'modal-2' }),
        [open]
      );

      return (
        <div>
          <button onClick={onOpenFirstModal}>Open First Modal</button>
          <button onClick={onOpenSecondModal}>Open Second Modal</button>
          <button onClick={clearModals}>Clear All Modals</button>
          <p>Modals count: {modals.length}</p>
        </div>
      );
    };

    render(
      <ModalProvider clearTime={CLEAR_TIME}>
        <TestComponent />
      </ModalProvider>
    );

    userEvent.click(screen.getByText('Open First Modal'));
    expect(await screen.findByText('First Modal')).toBeInTheDocument();

    userEvent.click(screen.getByText('Open Second Modal'));
    expect(await screen.findByText('Second Modal')).toBeInTheDocument();

    userEvent.click(screen.getByText('Clear All Modals'));
    await waitFor(() => {
      expect(screen.queryByText('First Modal')).not.toBeInTheDocument();
      expect(screen.queryByText('Second Modal')).not.toBeInTheDocument();
    });

    userEvent.click(screen.getByText('Open First Modal'));
    expect(await screen.findByText('First Modal')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('Modals count: 1')).toBeInTheDocument(), {
      timeout: CLEAR_TIME + 100,
    });
    expect(screen.getByText('First Modal')).toBeInTheDocument();
  });
});
