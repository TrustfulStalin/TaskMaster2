import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginPage: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div>
      <h2>Authentication</h2>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.name || user?.email || 'User'}!</p>
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log out
          </button>
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log in</button>
      )}
    </div>
  );
};

export default LoginPage;