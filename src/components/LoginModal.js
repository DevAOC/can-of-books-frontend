// import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
// import { useAuth0 } from "@auth0/auth0-react";

// const LoginModal = (props) => {
//   const { loginWithRedirect } = useAuth0();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     loginWithRedirect();

//     props.modal();
//     props.onLogin(event);
//   };

//   return (
//     <Modal show={props.show} aria-labelledby="contained-modal-title-vcenter" centered>
//       <Modal.Header closeButton onClick={props.modal}>
//         <Modal.Title id="contained-modal-title-vcenter">Log in</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={(e) => handleSubmit(e)}>
//           <FloatingLabel  controlId="floatingInput" label="Username">
//             <Form.Control className="mb-3" type="text" placeholder="Text" name="username" required />
//           </FloatingLabel>
//           <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
//             <Form.Control className="mb-3" type="email" placeholder="name@example.com" name="email" required />
//           </FloatingLabel>
//           <Button type="submit">Log in</Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// }

// export default LoginModal;