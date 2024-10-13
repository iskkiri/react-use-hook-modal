import React, { useCallback, useMemo, useState } from 'react';
import { ModalDispatchContext, ModalStateContext } from './ModalContext';
import type { ModalKey, ModalState, OpenParams } from '../types/modal';
import Modals from '../components/Modals';

interface ModalProviderProps {
  /**
   * The children elements that will be rendered inside the modal provider.
   * Typically, this would be the rest of your app that interacts with the modals.
   */
  children: React.ReactNode;

  /**
   * Optional custom container component for rendering the modals.
   * Defaults to `React.Fragment`. This prop allows users to define a custom container
   * where animations can be applied. For example, libraries like React Transition Group
   * can be integrated to handle modal animations. Users can set their own container
   * to manage the way modals are rendered and animated.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  container?: React.ComponentType<any>;

  /**
   * The time in milliseconds before a modal is fully removed from the DOM after closing.
   * This ensures that any exit animations (such as those from MUI, Bootstrap, or Chakra UI)
   * are fully displayed before the modal is removed.
   * Defaults to 3000 milliseconds (3 seconds).
   */
  clearTime?: number;
}

export default function ModalProvider({
  children,
  container,
  clearTime = 3000,
}: ModalProviderProps) {
  const [modals, setModals] = useState<ModalState[]>([]);

  const openModal = useCallback(
    <TProps,>({ Component, props, key, portalTarget }: OpenParams<TProps>) => {
      const propsWithIsOpen = { ...props, isOpen: true };

      setModals((modals) => {
        const targetIndex = modals.findIndex((modal) => modal.key === key);

        if (targetIndex !== -1) {
          const updatedModals = [...modals];
          updatedModals[targetIndex] = { ...updatedModals[targetIndex], props: propsWithIsOpen };
          return updatedModals;
        }

        return [...modals, { Component, props: propsWithIsOpen, key, portalTarget }];
      });
    },
    []
  );

  const closeModal = useCallback(
    (key: ModalKey) => {
      setModals((modals) => {
        return modals.map((modal) =>
          modal.key === key ? { ...modal, props: { ...modal.props, isOpen: false } } : modal
        );
      });

      setTimeout(() => {
        setModals((modals) => {
          const targetModal = modals.find((modal) => modal.key === key);
          if (!targetModal || targetModal.props.isOpen === true) return modals;

          return modals.filter((modal) => modal.key !== key);
        });
      }, clearTime);
    },
    [clearTime]
  );

  const dispatch = useMemo(() => ({ openModal, closeModal }), [openModal, closeModal]);

  return (
    <ModalStateContext.Provider value={{ modals }}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}

        <Modals container={container} modals={modals} />
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}
