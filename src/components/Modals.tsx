import React, { useContext } from 'react';
import { ModalStateContext } from '../contexts/ModalContext';
import ModalItem from './ModalItem';

interface ModalProps {
  container?: React.ComponentType<{ children: React.ReactNode }>;
}

export default function Modals({ container: Container = React.Fragment }: ModalProps) {
  const { modals } = useContext(ModalStateContext);

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
