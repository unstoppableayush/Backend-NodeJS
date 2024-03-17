## Problems in Statefull Authentication

=> If server restart or some reason server lost , all users get logged out.

=> Memory intensive

## Stateless Authentication

=> No states
=> We use JWT(JSON Web Tokens) Tokens 
=> Maintain the state on local browser using encoded msg of payload(token) and secret key.
=> Secret should be secret.