import Modal from "./Modal";

const Main = (props) => {
  const { showModal } = props;
  return (
    <div className="main-view">
      {showModal && <Modal />}
      {/* main content here */}
      This is the main page
    </div>
  );
};

export default Main;
