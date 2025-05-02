import React from 'react';
import keycloak from './keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';

const KeycloakProviderWrapper = ({ children }) => (
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={{
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
    }}
  >
    {children}
  </ReactKeycloakProvider>
);

export default KeycloakProviderWrapper;
