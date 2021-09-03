import React from 'react';
import Button from 'react-bootstrap/Button';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = (props) => {
  const { logout } = useAuth0();

  const handleClick = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div>
      <Button onClick={() => handleClick()}>Log out</Button>
    </div>
  );
};

export default LogoutButton;
