import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css'; // Assuming you have a separate CSS file

const App = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div className="app-container">
      <header>
        <h1>Welcome to the Auth0 Authentication App</h1>
      </header>
      <div className="auth-buttons">
        {!isAuthenticated ? (
          <button onClick={() => loginWithRedirect()}>Log In</button>
        ) : (
          <>
            <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
            <h2>You are logged in!</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
