import '../styles/stories.css';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalProvider, useClearModals } from 'react-use-hook-modal';
import useCustomModal from '@/hooks/useCustomModal';

const meta = {
  title: 'Examples/ClearModals',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      return (
        <ModalProvider clearTime={1000}>
          <Story />
        </ModalProvider>
      );
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ClearAllModalsExample: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const onOpenMultipleModals = useCallback(() => setIsOpen(true), []);
    const { clearModals } = useClearModals();

    const popUpList = useMemo(() => {
      return [...Array(3)].map((_, i) => ({
        id: i,
        title: `Custom Modal ${i + 1}`,
        content: `This is a Custom Modal ${i + 1}`,
      }));
    }, []);

    const { openCustomModal, closeCustomModal } = useCustomModal();

    useEffect(() => {
      if (isOpen) {
        popUpList.forEach((popUp) => {
          openCustomModal(
            {
              title: popUp.title,
              content: popUp.content,
              onClose: () => closeCustomModal(popUp.id),
              onConfirm: () => {
                console.log('Confirmed');
                /**************************************************************************************************************************************************
                 * To close multiple modals using the close function returned from useModal, you must use the same key that was assigned when opening each modal. *
                 **************************************************************************************************************************************************/
                closeCustomModal(popUp.id);
              },
              style: {
                transform: `translate(-${(popUpList.length - popUp.id - 1) * 50}% , -${(popUpList.length - popUp.id - 1) * 50}%)`,
              },
            },
            {
              /*****************************************************************************************************************************************
               * To open multiple modals using the open function returned from useModal, you must manually assign a unique key value for each modal. *
               *****************************************************************************************************************************************/
              key: popUp.id,
            }
          );
        });
        setIsOpen(false);
      }
    }, [isOpen, closeCustomModal, openCustomModal, popUpList]);

    return (
      <>
        <button onClick={onOpenMultipleModals} className="open-button">
          Open Multiple Modals
        </button>

        <button onClick={clearModals} className="clear-button">
          Clear All Modals
        </button>
      </>
    );
  },
};
