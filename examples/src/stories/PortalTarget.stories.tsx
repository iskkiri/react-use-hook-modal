import { useCallback, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalProvider } from 'react-use-hook-modal';
import useCustomModal from '@/hooks/useCustomModal';

import '../styles/stories.css';

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
    const { openCustomModal, closeCustomModal } = useCustomModal();

    const onOpenCustomModal = useCallback(() => {
      openCustomModal(
        {
          title: 'Custom Modal with modalRoot as the portal element',
          content:
            'Open the developer tools in your browser to check where the modal is being rendered',
          onClose: closeCustomModal,
          onConfirm: () => {
            console.log('Confirmed');
            closeCustomModal();
          },
        },
        {
          portalTarget: modalRootRef.current,
        }
      );
    }, [closeCustomModal, openCustomModal]);

    return (
      <div>
        <div ref={modalRootRef} />

        <button onClick={onOpenCustomModal} className="open-button">
          Open Custom Modal with modalRoot as the portal element
        </button>
      </div>
    );
  },
};
