// src/auth/AuthProvider.tsx
import type { ReactNode } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { TaskProvider } from '../context/Taskcontent';

interface Props {
  children: ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  return (
    <Auth0Provider
      domain="dev-ou321pthuemshnun.us.auth0.com"
      clientId="w7ZPpMKPhrO3SOlIDejBerXxgoi0PoTy"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://dev-ou321pthuemshnun.us.auth0.com/api/v2/', // API audience for secure endpoints
      }}
    >
      <TaskProvider>{children}</TaskProvider>
    </Auth0Provider>
  );
};

export default AuthProvider;