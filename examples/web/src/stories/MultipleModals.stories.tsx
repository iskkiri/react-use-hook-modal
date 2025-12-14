import { lazy, useCallback, useEffect, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalProvider, useModal } from 'react-use-hook-modal';

import '../styles/stories.css';

const CustomModal = lazy(() => import('@/components/CustomModal'));

const meta = {
  title: 'Examples/MultipleModals',
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
    const [isOpenMultipleModals, setIsOpenMultipleModals] = useState(false);
    const onOpenMultipleModals = useCallback(() => setIsOpenMultipleModals(true), []);

    const popUpList = useMemo(() => {
      return [...Array(3)].map((_, i) => ({
        id: i,
        title: `Custom Modal ${i + 1}`,
        content: `This is a Custom Modal ${i + 1}`,
      }));
    }, []);

    const { open: openCustomModal, close: closeCustomModal } = useModal(CustomModal);

    useEffect(() => {
      if (isOpenMultipleModals) {
        popUpList.forEach((popUp) => {
          openCustomModal(
            {
              title: popUp.title,
              content: popUp.content,
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
        setIsOpenMultipleModals(false);
      }
    }, [isOpenMultipleModals, closeCustomModal, openCustomModal, popUpList]);

    return (
      <button onClick={onOpenMultipleModals} className="open-button">
        Open Multiple Modals
      </button>
    );
  },
};
