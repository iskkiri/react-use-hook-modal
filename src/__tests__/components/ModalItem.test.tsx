import React from 'react';
import { render, screen } from '@testing-library/react';
import ModalItem from '../../components/ModalItem';

const TestComponent = ({ message }: { message: string }) => {
  return <div>{message}</div>;
};

describe('ModalItem', () => {
  it('renders component inside default portal (document.body)', () => {
    render(<ModalItem component={TestComponent} props={{ message: 'Modal Message' }} />);

    expect(screen.getByText('Modal Message')).toBeInTheDocument();
  });

  it('renders component inside given portalTarget', () => {
    const portalDiv = document.createElement('div');
    document.body.appendChild(portalDiv);

    render(
      <ModalItem
        component={TestComponent}
        props={{ message: 'Hello Portal' }}
        portalTarget={portalDiv}
      />
    );

    expect(portalDiv).toContainElement(screen.getByText('Hello Portal'));

    document.body.removeChild(portalDiv);
  });

  it('renders component without portal in React Native environment', async () => {
    const originalNavigator = global.navigator;

    Object.defineProperty(global, 'navigator', {
      value: { product: 'ReactNative' },
      writable: true,
    });

    // Re-import to pick up the new navigator value
    vi.resetModules();
    const { default: ModalItemRN } = await import('../../components/ModalItem');

    render(<ModalItemRN component={TestComponent} props={{ message: 'React Native Modal' }} />);

    expect(screen.getByText('React Native Modal')).toBeInTheDocument();

    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      writable: true,
    });
  });
});
