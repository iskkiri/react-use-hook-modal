import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalProvider } from 'react-use-hook-modal';
import useCustomModal from '@/hooks/useCustomModal';

import '../styles/stories.css';

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
    const [reRender, setReRender] = useState(false);
    const onReRender = useCallback(() => setReRender(true), []);

    const popUpList = useMemo(() => {
      return [...Array(3)].map((_, i) => ({
        id: i,
        title: `Custom Modal ${i + 1}`,
        content: `This is a Custom Modal ${i + 1}`,
      }));
    }, []);

    const { isInitialized, openCustomModal, closeCustomModal } = useCustomModal();

    useEffect(() => {
      if (!isInitialized) return;

      popUpList.forEach((popUp) => {
        openCustomModal(
          {
            title: popUp.title,
            content: popUp.content,
            onClose: () => closeCustomModal(popUp.id),
            onConfirm: () => {
              console.log('Confirmed');
              closeCustomModal();
            },
            style: {
              transform: `translate(-${(popUpList.length - popUp.id - 1) * 50}% , -${(popUpList.length - popUp.id - 1) * 50}%)`,
            },
          },
          {
            /*****************************************************************************************************************************************
             * To render multiple modals using the open function returned from useModal, you must manually assign a unique key value for each modal. *
             *************************************************************************************************************************************** */
            key: popUp.id,
          }
        );
      });
    }, [closeCustomModal, isInitialized, openCustomModal, popUpList]);

    useEffect(() => {
      if (reRender) {
        popUpList.forEach((popUp) => {
          openCustomModal(
            {
              title: popUp.title,
              content: popUp.content,
              onClose: () => closeCustomModal(popUp.id),
              onConfirm: () => {
                console.log('Confirmed');
                closeCustomModal();
              },
              style: {
                transform: `translate(-${(popUpList.length - popUp.id - 1) * 50}% , -${(popUpList.length - popUp.id - 1) * 50}%)`,
              },
            },
            {
              /*****************************************************************************************************************************************
               * To render multiple modals using the open function returned from useModal, you must manually assign a unique key value for each modal. *
               *************************************************************************************************************************************** */
              key: popUp.id,
            }
          );
        });
        setReRender(false);
      }
    }, [reRender, closeCustomModal, openCustomModal, popUpList]);

    return (
      <button onClick={onReRender} className="open-button">
        Re-render
      </button>
    );
  },
};
