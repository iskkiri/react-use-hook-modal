import { lazy } from 'react';
import { useModal } from 'react-use-hook-modal';

const AnimatedModalWithReactTransitionGroup = lazy(
  () => import('@/components/AnimatedModalWithReactTransitionGroup')
);

export default function useAnimatedModalWithReactTransitionGroup() {
  const {
    open: openAnimatedModalWithReactTransitionGroup,
    close: closeAnimatedModalWithReactTransitionGroup,
  } = useModal(AnimatedModalWithReactTransitionGroup);

  return { openAnimatedModalWithReactTransitionGroup, closeAnimatedModalWithReactTransitionGroup };
}
