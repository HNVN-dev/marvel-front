import "./Modal.css";

const Modal = ({ open, children }) => {
  if (!open) return null;
  return <>{children}</>;
};
export default Modal;
