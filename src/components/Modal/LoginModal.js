import React from "react";
import "./LoginModal.css";
import Card from "../UI/Card";
import Button from "../UI/Button";

const LoginModal = (props) => {
  const cssClasses = ["Modal", props.show ? "ModalOpen" : "ModalClosed"];

  return (
    <Card className={cssClasses.join(" ")}>
      <h2>Your Session is About to Expire!</h2>
      <p>Your session is about to expire.</p>
      <p>Do you need more time?</p>
      <Button onClick={props.closed}>Logout</Button>
      <Button onClick={props.open}>Continue</Button>
    </Card>
  );
};

export default LoginModal;
