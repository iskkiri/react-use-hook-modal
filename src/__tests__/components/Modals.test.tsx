import React from 'react';
import { render, screen } from '@testing-library/react';
import { ModalStateContext } from '../../contexts/ModalContext';
import Modals from '../../components/Modals';
import type { ModalState } from '../../types/modal';
import { modals } from '../test-utils';

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
    const CustomContainer = ({ children }: { children: React.ReactNode }) => (
      <div data-testid="custom-container">{children}</div>
    );

    render(
      <ModalStateContext.Provider value={{ modals }}>
        <Modals container={CustomContainer} modals={modals} />
      </ModalStateContext.Provider>
    );

    const customContainer = screen.getByTestId('custom-container');
    expect(screen.getByTestId('custom-container')).toBeInTheDocument();
    expect(customContainer).toContainElement(screen.getByText('Hello World'));
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
