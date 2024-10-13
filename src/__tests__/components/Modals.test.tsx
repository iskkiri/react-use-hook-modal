import React from 'react';
import { render, screen } from '@testing-library/react';
import { ModalStateContext } from '../../contexts/ModalContext';
import Modals from '../../components/Modals';
import type { ModalState } from '../../types/modal';
import { modals } from '../test-utils';

// Mock ModalItem to isolate testing of Modals component
vi.mock('../../components/ModalItem', () => ({
  default: ({
    component: Component,
    props,
  }: {
    component: React.ComponentType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: any;
  }) => <div>{Component && <Component {...props} />}</div>,
}));

describe('Modals Component', () => {
  it('renders modals from the context', () => {
    render(
      <ModalStateContext.Provider value={{ modals }}>
        <Modals modals={modals} />
      </ModalStateContext.Provider>
    );

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders using a custom container', () => {
    const modals = [
      {
        Component: ({ message }: { message: string }) => <div>{message}</div>,
        props: { message: 'Custom Container Modal' },
        key: 'modal2',
        portalTarget: null,
      },
    ] satisfies ModalState[];

    const CustomContainer = ({ children }: { children: React.ReactNode }) => (
      <div data-testid="custom-container">{children}</div>
    );

    render(
      <ModalStateContext.Provider value={{ modals }}>
        <Modals container={CustomContainer} modals={modals} />
      </ModalStateContext.Provider>
    );

    expect(screen.getByTestId('custom-container')).toBeInTheDocument();
    expect(screen.getByText('Custom Container Modal')).toBeInTheDocument();
  });

  it('renders no modals if context is empty', () => {
    const modals: ModalState[] = [];

    render(
      <ModalStateContext.Provider value={{ modals }}>
        <Modals modals={modals} />
      </ModalStateContext.Provider>
    );

    expect(screen.queryByText(/./)).toBeNull();
  });
});
