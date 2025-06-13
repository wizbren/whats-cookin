import { Modal, Button } from "react-bootstrap";

const ModalComponent = (props) => {
  const { show, onClose, selectedRecipe } = props;

  return (
    <Modal show={show} onHide={onClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>What’s Cookin’</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedRecipe ? (
          <div>
            <h4>{selectedRecipe.title}</h4>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              className="img-fluid mb-3"
              style={{ borderRadius: "8px" }}
            />
            <p>{selectedRecipe.description}</p>
            <a
              href={selectedRecipe.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              View Full Recipe
            </a>
          </div>
        ) : (
          <p>Loading recipe...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
