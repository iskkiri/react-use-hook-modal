import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  /**
   * A callback function that is triggered immediately after any modal is opened.
   * This callback applies globally to all modals within the provider. It provides the
   * currently opened modal's state as a parameter, allowing for specific actions like
   * setting focus or starting animations based on the opened modal.
   * @param modal - The state of the modal that was just opened.
   */
  onAfterOpen?: (modal: ModalState) => void;

  /**
   * A callback function that is triggered immediately after any modal is closed.
   * This callback applies globally to all modals within the provider. It provides the
   * closed modal's state as a parameter, which can be useful for cleanup tasks or
   * resetting modal-specific state.
   * @param modal - The state of the modal that was just closed.
   */
  onAfterClose?: (modal: ModalState) => void;
}

export default function ModalProvider({
  children,
  container,
  clearTime = 3000,
  onAfterOpen,
  onAfterClose,
}: ModalProviderProps) {
  const [modals, setModals] = useState<ModalState[]>([]);
  const prevModalsRef = useRef<ModalState[]>([]);

  useEffect(() => {
    const prevModals = prevModalsRef.current;

    modals.forEach((modal) => {
      const prevModal = prevModals.find((m) => m.key === modal.key);

      if ((!prevModal || !prevModal.props.isOpen) && modal.props.isOpen && onAfterOpen) {
        onAfterOpen(modal);
      }

      if (prevModal && !modal.props.isOpen && prevModal.props.isOpen && onAfterClose) {
        onAfterClose(modal);
      }
    });

    prevModalsRef.current = modals;
  }, [modals, onAfterOpen, onAfterClose]);

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

  const clearModals = useCallback(() => {
    setModals((modals) => {
      return modals.map((modal) => ({ ...modal, props: { ...modal.props, isOpen: false } }));
    });

    setTimeout(() => {
      setModals((modals) => modals.filter((modal) => modal.props.isOpen === true));
    }, clearTime);
  }, [clearTime]);

  const dispatch = useMemo(
    () => ({ openModal, closeModal, clearModals }),
    [openModal, closeModal, clearModals]
  );

  return (
    <ModalStateContext.Provider value={{ modals }}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}

        <Modals container={container} modals={modals} />
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}
