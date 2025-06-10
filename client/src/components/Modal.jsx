import { Modal, Button } from "react-bootstrap";

const ModalComponent = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>What’s Cookin’</Modal.Title>
      </Modal.Header>
      <Modal.Body>This is where the recipe will go once we fetch it from the API</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
