const LoggedModal = ({ loggedOpen, children }) => {
  if (!loggedOpen) return null;
  return <>{children}</>;
};

export default LoggedModal;
