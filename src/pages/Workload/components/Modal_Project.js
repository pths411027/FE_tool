import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

function ModalProject({ modalOpen, closeModalOpen, modal_title, modal_des, buttons }) {
  
  return (
    <Modal basic open={modalOpen} onClose={closeModalOpen} size='small'>
      <Modal.Header>
        <i className="archive icon"></i>
        {modal_title}
      </Modal.Header>
      <Modal.Content>
        <p>{modal_des}</p>
        <p>By Ops BI</p>
      </Modal.Content>
      <Modal.Actions>
        {buttons.map((button, index) => (
          <Button
            key={index}
            basic={button.color === 'red'}
            color={button.color}
            inverted={button.inverted}
            icon={button.icon}
            onClick={button.onClick}
          >
            {button.text}
          </Button>
        ))}
      </Modal.Actions>
    </Modal>
  );
}

export default ModalProject;
