export type ModalKey = string | number;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ModalState<TProps = any> {
  Component: React.ComponentType<TProps>;
  props: TProps & { isOpen: boolean };
  key: ModalKey;
  portalTarget?: HTMLElement | null;
}

export interface ModalStateContextType {
  modals: ModalState[];
}

export interface OpenParams<TProps> extends Omit<ModalState<TProps>, 'props'> {
  props?: Omit<TProps, 'isOpen'>;
}

export interface CloseParams extends Omit<CloseModalOptions, 'modalKey'> {
  key: ModalKey;
}

export interface ModalDispatchContextType {
  openModal: <TProps>(params: OpenParams<TProps>) => void;
  closeModal: (params: CloseParams) => void;
  clearModals: () => void;
}

type IsPropsRequired<TProps> =
  Exclude<keyof TProps, 'isOpen'> extends never
    ? false
    : Partial<Pick<TProps, Exclude<keyof TProps, 'isOpen'>>> extends Pick<
          TProps,
          Exclude<keyof TProps, 'isOpen'>
        >
      ? false
      : true;

export interface OpenModalOptions {
  key?: ModalKey;
  portalTarget?: HTMLElement | null;
}

export type OpenModal<TProps> =
  IsPropsRequired<TProps> extends true
    ? (props: Omit<TProps, 'isOpen'>, options?: OpenModalOptions) => void
    : (props?: Omit<TProps, 'isOpen'>, options?: OpenModalOptions) => void;

export interface CloseModalOptions {
  key?: ModalKey;
  clearTime?: number;
}

export type CloseModal = (options?: CloseModalOptions) => void;

export interface UseModalReturn<TProps> {
  open: OpenModal<TProps>;
  close: CloseModal;
  key: ModalKey;
}
