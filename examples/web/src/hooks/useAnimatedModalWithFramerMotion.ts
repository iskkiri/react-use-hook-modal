import { lazy } from 'react';
import { useModal } from 'react-use-hook-modal';

const AnimatedModalWithFramerMotion = lazy(
  () => import('@/components/AnimatedModalWithFramerMotion')
);

export default function useAnimatedModalWithFramerMotion() {
  const { open: openAnimatedModalWithFramerMotion, close: closeAnimatedModalWithFramerMotion } =
    useModal(AnimatedModalWithFramerMotion);

  return { openAnimatedModalWithFramerMotion, closeAnimatedModalWithFramerMotion };
}
