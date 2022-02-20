import "./Modal.css";

const Modal = ({ open, children, openOrClose }) => {
  if (!open) return null;
  return <>{children}</>;
};
export default Modal;
