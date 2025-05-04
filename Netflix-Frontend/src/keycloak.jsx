import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://13.202.25.33:8443/',
  realm: 'Netflix',
  clientId: 'Netflix-App',
});

export default keycloak;

//Local : url: 'http://localhost:8180/'
