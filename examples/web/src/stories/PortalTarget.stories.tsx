import { lazy, useCallback, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalProvider, useModal } from 'react-use-hook-modal';

import '../styles/stories.css';

const CustomModal = lazy(() => import('@/components/CustomModal'));

const meta = {
  title: 'Examples/PortalTarget',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      return (
        <ModalProvider>
          <Story />
        </ModalProvider>
      );
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: function Render() {
    const modalRootRef = useRef<HTMLDivElement | null>(null);
    const { open: openCustomModal } = useModal(CustomModal);

    const onOpenCustomModal = useCallback(() => {
      openCustomModal(
        {
          title: 'Custom Modal with modalRoot as the portal element',
          content:
            'Open the developer tools in your browser to check where the modal is being rendered',
        },
        {
          portalTarget: modalRootRef.current,
        }
      );
    }, [openCustomModal]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div ref={modalRootRef} style={{ fontSize: '18px', fontWeight: 'bold' }}>
          Modal Root
        </div>

        <button onClick={onOpenCustomModal} className="open-button">
          Open Custom Modal with modalRoot as the portal element
        </button>
      </div>
    );
  },
};
