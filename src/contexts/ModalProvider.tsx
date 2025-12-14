import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ModalDispatchContext, ModalStateContext } from './ModalContext';
import type { ModalDispatchContextType, ModalKey, ModalState, UpdateModalParams } from '../types/modal';
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
   * The time in milliseconds before a modal is fully removed from the internal state
   * after closing. This allows any exit animations from CSS frameworks (like MUI, Bootstrap, or Chakra UI)
   * to complete before the modal is removed.
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
  const resolverMapRef = useRef<Map<ModalKey, (result: unknown) => void>>(new Map());

  // Detect modal open/close state changes and trigger corresponding callbacks.
  // Compares current modals with previous snapshot to determine which modals
  // have been opened or closed since the last render.
  useEffect(() => {
    const prevModals = prevModalsRef.current;

    modals.forEach((modal) => {
      const prevModal = prevModals.find((m) => m.key === modal.key);

      // Modal opened: didn't exist before or was closed, now is open
      if ((!prevModal || !prevModal.props.isOpen) && modal.props.isOpen && onAfterOpen) {
        onAfterOpen(modal);
      }

      // Modal closed: existed and was open before, now is closed
      if (prevModal && prevModal.props.isOpen && !modal.props.isOpen && onAfterClose) {
        onAfterClose(modal);
      }
    });

    // Store current state as reference for next comparison
    prevModalsRef.current = modals;
  }, [modals, onAfterOpen, onAfterClose]);

  const openModal: ModalDispatchContextType['openModal'] = useCallback((modalState) => {
    return new Promise((resolve) => {
      resolverMapRef.current.set(modalState.key, resolve as (result: unknown) => void);

      setModals((modals) => {
        const targetIndex = modals.findIndex((modal) => modal.key === modalState.key);

        if (targetIndex !== -1) {
          const updatedModals = [...modals];
          updatedModals[targetIndex] = { ...updatedModals[targetIndex], props: modalState.props };
          return updatedModals;
        }

        return [...modals, modalState];
      });
    });
  }, []);

  const closeModal: ModalDispatchContextType['closeModal'] = useCallback(
    ({ key, clearTime: eachClearTime, result }) => {
      const resolver = resolverMapRef.current.get(key);
      if (resolver) {
        resolver(result);
        resolverMapRef.current.delete(key);
      }

      setModals((modals) => {
        return modals.map((modal) =>
          modal.key === key
            ? {
                ...modal,
                props: {
                  ...modal.props,
                  isOpen: false,
                },
              }
            : modal
        );
      });

      const timeout = typeof eachClearTime === 'number' ? eachClearTime : clearTime;

      setTimeout(() => {
        setModals((modals) => {
          const targetModal = modals.find((modal) => modal.key === key);
          if (!targetModal || targetModal.props.isOpen === true) return modals;

          return modals.filter((modal) => modal.key !== key);
        });
      }, timeout);
    },
    [clearTime]
  );

  const updateModal = useCallback(({ key, props }: UpdateModalParams) => {
    setModals((modals) => {
      const targetModal = modals.find((modal) => modal.key === key);

      // Ignore if modal doesn't exist or is not open
      if (!targetModal || !targetModal.props.isOpen) {
        return modals;
      }

      return modals.map((modal) =>
        modal.key === key
          ? {
              ...modal,
              props: {
                ...modal.props,
                ...props,
                // Prevent overwriting injected props
                isOpen: modal.props.isOpen,
                close: modal.props.close,
              },
            }
          : modal
      );
    });
  }, []);

  const clearModals = useCallback(() => {
    // Resolve all pending promises with undefined
    resolverMapRef.current.forEach((resolver) => {
      resolver(undefined);
    });
    resolverMapRef.current.clear();

    setModals((modals) => {
      return modals.map((modal) => ({
        ...modal,
        props: {
          ...modal.props,
          isOpen: false,
        },
      }));
    });

    setTimeout(() => {
      setModals((modals) => modals.filter((modal) => modal.props.isOpen === true));
    }, clearTime);
  }, [clearTime]);

  const dispatch = useMemo(
    () => ({ openModal, closeModal, updateModal, clearModals }),
    [openModal, closeModal, updateModal, clearModals]
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
