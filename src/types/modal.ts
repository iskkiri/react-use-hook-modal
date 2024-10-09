export interface ModalInitializedContextType {
  isInitialized: boolean;
}

export type ModalKey = string | number;

export interface ModalState<TProps> {
  Component: React.ComponentType<TProps>;
  props: TProps & { isOpen: boolean };
  key: ModalKey;
  portalTarget?: HTMLElement | null;
}

export interface ModalStateContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modals: ModalState<any>[];
}

export interface OpenParams<TProps> {
  Component: React.ComponentType<TProps>;
  props?: Omit<TProps, 'isOpen'>;
  key: ModalKey;
  portalTarget?: HTMLElement | null;
}

export interface ModalDispatchContextType {
  openModal: <TProps>(params: OpenParams<TProps>) => void;
  closeModal: (key: ModalKey) => void;
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

export type CloseModal = (modalKey?: ModalKey) => void;

export interface UseModalReturn<TProps> {
  isInitialized: boolean;
  open: OpenModal<TProps>;
  close: CloseModal;
}
