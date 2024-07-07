interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className='relative modal-box'>
        <label
          onClick={() => setModalOpen(false)}
          className='absolute btn btn-sm btn-circle right-2 top-2'
        >
          ✕
        </label>
        {children}
      </div>
    </div>
  );
};

export default Modal;