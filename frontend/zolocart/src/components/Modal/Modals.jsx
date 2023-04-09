import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react";

function MyVerticallyCenteredModal({
  show,onHide,...props
}) {
  return (
    <Modal
      show = {show}
      onHide = {onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className={props.styles.heading} id="contained-modal-title-vcenter">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {<props.Body setIsAuthorized={props.setIsAuthorized} isAuthorized={props.isAuthorized} setUserName={props.setUserName} />}
      </Modal.Body>
      {
        !props.close?
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
        :null
      }
    </Modal>
  );
}

function Modals(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="warning" className={props.styles.button} onClick={() => setModalShow(true)}>
        {props.button}
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)
        }
        {...props}
      />
    </>
  );
}

export default Modals;