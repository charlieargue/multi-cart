import React from 'react';
import { Button, Modal } from "react-bootstrap";

// import './ModalComponentProps.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type ModalComponentProps = {
  children?: React.ReactNode;
  onHide?(): void;
  show?: boolean;
  dialogClassName?: string;
}

// -------------------
// thx: https://react-bootstrap.github.io/components/modal/
export function ModalComponent(props: ModalComponentProps) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {props.children}
    </Modal>
  );
}

export default ModalComponent;
