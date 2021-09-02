import React from 'react'
import Button  from 'react-bootstrap/Button';
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = (props) => {
  const { logout } = useAuth0();

  const handleClick = () => {
    console.log("LOGOUT");
    logout({ returnTo: window.location.origin });
    props.onLogout();
  }

  return (
    <div>
      <Button onClick={() => handleClick()}>Log out</Button>
    </div>
  )
}

export default LogoutButton;