import React from 'react';
import { Button, Modal as BootstrapModal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Modal({
  isOpen, toggle, title, children,
  primary, secondary, onPrimary, onSecondary
}) {
  return (
    <BootstrapModal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        {children}
      </ModalBody>
      <ModalFooter>
        { primary ? <Button color="primary" onClick={onPrimary}>{primary}</Button> : null }
        { secondary ? <Button color="secondary" onClick={onSecondary}>{secondary}</Button> : null }
      </ModalFooter>
    </BootstrapModal>
  )
}

export default Modal;