import "./App.scss";
import { useStore } from "./zustand/store";
import NewPostBtn from "./components/NewPostBtn/NewPostBtn";
import Posts from "./components/Posts/Posts";
import Modal from "react-modal";
import EditPost from "./components/modalOptions/EditPost/EditPost";
import AddPost from "./components/modalOptions/AddPost/AddPost";
import FetchPost from "./components/FetchPost/FetchPost";

function App() {
  const { modalIsOpen, modalContent, openModal, closeModal } = useStore();

  return (
    <div className="container">
      <FetchPost />
      <Posts openModal={() => openModal("editPost")} />
      <NewPostBtn openModal={() => openModal("newPost")} />
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        {modalContent === "newPost" && <AddPost closeModal={closeModal} />}
        {modalContent === "editPost" && <EditPost closeModal={closeModal} />}
      </Modal>
    </div>
  );
}

export default App;
