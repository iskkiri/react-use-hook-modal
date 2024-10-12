/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ModalStateContext } from '../../contexts/ModalContext';
import Modals from '../../components/Modals';
import type { ModalState } from '../../types/modal';

// Mock ModalItem to isolate testing of Modals component
vi.mock('../../components/ModalItem', () => ({
  default: ({
    component: Component,
    props,
  }: {
    component: React.ComponentType<any>;
    props: any;
  }) => <div>{Component && <Component {...props} />}</div>,
}));

describe('Modals Component', () => {
  it('renders modals from the context', () => {
    const modals = [
      {
        Component: ({ message }: { message: string }) => <div>{message}</div>,
        props: { message: 'Hello World' },
        key: 'modal1',
        portalTarget: null,
      },
    ] satisfies ModalState<any>[];

    render(
      <ModalStateContext.Provider value={{ modals }}>
        <Modals />
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
    ] satisfies ModalState<any>[];

    const CustomContainer = ({ children }: { children: React.ReactNode }) => (
      <div data-testid="custom-container">{children}</div>
    );

    render(
      <ModalStateContext.Provider value={{ modals }}>
        <Modals container={CustomContainer} />
      </ModalStateContext.Provider>
    );

    expect(screen.getByTestId('custom-container')).toBeInTheDocument();
    expect(screen.getByText('Custom Container Modal')).toBeInTheDocument();
  });

  it('renders no modals if context is empty', () => {
    const modals: any[] = [];

    render(
      <ModalStateContext.Provider value={{ modals }}>
        <Modals />
      </ModalStateContext.Provider>
    );

    expect(screen.queryByText(/./)).toBeNull();
  });
});
