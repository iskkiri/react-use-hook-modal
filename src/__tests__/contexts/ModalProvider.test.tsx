import React, { useCallback } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalProvider from '../../contexts/ModalProvider';
import useModal from '../../hooks/useModal';
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

describe('ModalProvider', () => {
  it('should open and close a modal properly', async () => {
    const TestComponent = () => {
      const { open, close } = useModal(TestModal);

      const onOpen = useCallback(() => open({ onClose: close }), [close, open]);

      return <button onClick={onOpen}>Open Modal</button>;
    };

    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    userEvent.click(screen.getByText('Open Modal'));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    userEvent.click(screen.getByText('Close'));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('should update existing modal when opened again with the same key and different props', async () => {
    const TestComponent = () => {
      const { open, close } = useModal(TestModal);

      const onOpenWithTitle = useCallback(
        (title: string) => () => open({ onClose: close, title }, { key: 'modal-1' }),
        [close, open]
      );

      return (
        <div>
          <button onClick={onOpenWithTitle('Title 1')}>Open Modal with Title 1</button>
          <button onClick={onOpenWithTitle('Title 2')}>Open Modal with Title 2</button>
        </div>
      );
    };

    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    userEvent.click(screen.getByText('Open Modal with Title 1'));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Title 1')).toBeInTheDocument();

    userEvent.click(screen.getByText('Open Modal with Title 2'));

    await waitFor(() => expect(screen.getByText('Title 2')).toBeInTheDocument());
  });

  it('should open multiple modals with the same function but different keys', async () => {
    const TestComponent = () => {
      const { open, close } = useModal(TestModal);

      const onOpenFirstModal = useCallback(
        () => open({ onClose: close, title: 'First Modal' }, { key: 'modal-1' }),
        [close, open]
      );
      const onOpenSecondModal = useCallback(
        () => open({ onClose: close, title: 'Second Modal' }, { key: 'modal-2' }),
        [close, open]
      );

      return (
        <div>
          <button onClick={onOpenFirstModal}>Open First Modal</button>
          <button onClick={onOpenSecondModal}>Open Second Modal</button>
        </div>
      );
    };

    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    userEvent.click(screen.getByText('Open First Modal'));
    expect(await screen.findByText('First Modal')).toBeInTheDocument();

    userEvent.click(screen.getByText('Open Second Modal'));
    expect(await screen.findByText('Second Modal')).toBeInTheDocument();

    expect(screen.getByText('First Modal')).toBeInTheDocument();
    expect(screen.getByText('Second Modal')).toBeInTheDocument();
  });

  it('should not close the modal if a different key is passed to closeModal', async () => {
    const TestComponent = () => {
      const { open, close } = useModal(TestModal);

      const onOpenFirstModal = useCallback(
        () => open({ onClose: () => close('modal-1'), title: 'First Modal' }, { key: 'modal-1' }),
        [close, open]
      );
      const onOpenSecondModal = useCallback(
        () => open({ onClose: () => close('modal-2'), title: 'Second Modal' }, { key: 'modal-2' }),
        [close, open]
      );

      return (
        <div>
          <button onClick={onOpenFirstModal}>Open First Modal</button>
          <button onClick={onOpenSecondModal}>Open Second Modal</button>
        </div>
      );
    };

    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    userEvent.click(screen.getByText('Open First Modal'));
    expect(await screen.findByText('First Modal')).toBeInTheDocument();

    userEvent.click(screen.getByText('Open Second Modal'));
    expect(await screen.findByText('Second Modal')).toBeInTheDocument();

    const firstModal = screen.getByText('First Modal').closest('div[role="dialog"]') as HTMLElement;
    const closeButtonInFirstModal = within(firstModal).getByRole('button', { name: /Close/i });
    userEvent.click(closeButtonInFirstModal);

    await waitFor(() => expect(screen.queryByText('First Modal')).not.toBeInTheDocument());

    expect(screen.getByText('Second Modal')).toBeInTheDocument();
  });

  it('should not remove modal from state if it is reopened before clearTime', async () => {
    const clearTime = 1000;

    const TestComponent = () => {
      const { open, close } = useModal(TestModal);

      const onOpen = useCallback(
        () => open({ onClose: close, title: 'Test Modal' }),
        [close, open]
      );

      return <button onClick={onOpen}>Open Modal</button>;
    };

    render(
      <ModalProvider clearTime={clearTime}>
        <TestComponent />
      </ModalProvider>
    );

    userEvent.click(screen.getByText('Open Modal'));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    userEvent.click(screen.getByText('Close'));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

    userEvent.click(screen.getByText('Open Modal'));

    await new Promise((resolve) => setTimeout(resolve, clearTime + 100));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('should remove modal from state after clearTime', async () => {
    const clearTime = 1000;

    const TestComponent = () => {
      const { modals } = useModalsState();
      const { open, close } = useModal(TestModal);

      const onOpen = useCallback(() => open({ onClose: close }), [close, open]);

      return (
        <div>
          <button onClick={onOpen}>Open Modal</button>
          <p>Modals count: {modals.length}</p>
        </div>
      );
    };

    render(
      <ModalProvider clearTime={clearTime}>
        <TestComponent />
      </ModalProvider>
    );

    userEvent.click(screen.getByText('Open Modal'));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    userEvent.click(screen.getByText('Close'));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

    expect(screen.getByText('Modals count: 1')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('Modals count: 0')).toBeInTheDocument(), {
      timeout: clearTime + 100,
    });
  });
});
