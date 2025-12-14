export type ModalKey = string | number;

export interface InjectedProps<TResult = unknown> {
  isOpen: boolean;
  close: CloseModal<TResult>;
}
export type InjectedPropsKeys = keyof InjectedProps;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ModalState<TProps = any, TResult = unknown> {
  Component: React.ComponentType<TProps>;
  props: TProps & InjectedProps<TResult>;
  key: ModalKey;
  portalTarget?: HTMLElement | null;
}

export interface ModalStateContextType {
  modals: ModalState[];
}

export interface UpdateModalParams {
  key: ModalKey;
  props: Record<string, unknown>;
}

export interface ModalDispatchContextType {
  openModal: <TProps, TResult = unknown>(params: ModalState<TProps, TResult>) => Promise<TResult>;
  closeModal: <TResult = unknown>(params: CloseParams<TResult>) => void;
  updateModal: (params: UpdateModalParams) => void;
  clearModals: () => void;
}

type UserProvidedKeys<TProps> = Exclude<keyof TProps, InjectedPropsKeys>;

type IsPropsRequired<TProps> =
  UserProvidedKeys<TProps> extends never
    ? false
    : Partial<Pick<TProps, UserProvidedKeys<TProps>>> extends Pick<TProps, UserProvidedKeys<TProps>>
      ? false
      : true;

export interface OpenModalOptions {
  key?: ModalKey;
  portalTarget?: HTMLElement | null;
}

export type OpenModal<TProps, TResult = unknown> =
  IsPropsRequired<TProps> extends true
    ? (
        props: DistributiveOmit<TProps, InjectedPropsKeys>,
        options?: OpenModalOptions
      ) => Promise<TResult>
    : (
        props?: DistributiveOmit<TProps, InjectedPropsKeys>,
        options?: OpenModalOptions
      ) => Promise<TResult>;

export type CloseModalOptions<TResult = unknown> = {
  key?: ModalKey;
  clearTime?: number;
} & (unknown extends TResult ? { result?: TResult } : { result: TResult });

export type CloseParams<TResult = unknown> = CloseModalOptions<TResult> & {
  key: ModalKey;
};

export type CloseModal<TResult = unknown> = unknown extends TResult
  ? (options?: CloseModalOptions<TResult>) => void
  : (options: CloseModalOptions<TResult>) => void;

export interface UpdateModalOptions {
  key?: ModalKey;
}

export type UpdateModal<TProps> = (
  props: Partial<DistributiveOmit<TProps, InjectedPropsKeys>>,
  options?: UpdateModalOptions
) => void;

export interface UseModalReturn<TProps, TResult = unknown> {
  open: OpenModal<TProps, TResult>;
  close: CloseModal<TResult>;
  update: UpdateModal<TProps>;
  key: ModalKey;
}

/**
 * A utility type that correctly distributes Omit over union types.
 *
 * In TypeScript, when a conditional type like `T extends U ? X : Y` is used with
 * a union type `T = A | B | C`, the conditional type is automatically distributed over
 * each member of the union, resulting in:
 * `(A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)`
 *
 * This distributive behavior is used here to apply Omit to each member of a union type,
 * preserving the discriminated union relationships.
 */
export type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

/**
 * Infers the TResult type from a modal component's close prop.
 * If the component has `close: CloseModal<SomeType>`, extracts SomeType.
 * Falls back to `unknown` if close prop doesn't exist or isn't typed.
 */
export type InferResult<TProps> = TProps extends { close: CloseModal<infer R> } ? R : unknown;
