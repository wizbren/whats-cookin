const Modal = ({ onClose }) => {
  const handleOverlayClick = (event) => {
    // Only close if the user clicks *on the overlay*, not inside the modal
    if (event.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Modal Title</h2>
        <p>Modal content goes here.</p>
      </div>
    </div>
  );
};

export default Modal;