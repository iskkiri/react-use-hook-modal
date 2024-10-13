import React from 'react';
import ModalItem from './ModalItem';
import type { ModalState } from '../types/modal';

interface ModalsProps {
  modals: ModalState[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  container?: React.ComponentType<any>;
}

export default function Modals({ container: Container = React.Fragment, modals }: ModalsProps) {
  return (
    <Container>
      {modals.map((modal) => {
        const { Component, props, key, portalTarget } = modal;

        return (
          <ModalItem key={key} component={Component} props={props} portalTarget={portalTarget} />
        );
      })}
    </Container>
  );
}
