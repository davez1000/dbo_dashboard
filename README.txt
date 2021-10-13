For local:

In the dbo_dashboard module:

cd source
npm install

in .env, add the jwt bearer token, and the base URL.


Enable the module, (dbo_stats will also be enabled), and generate some hits by visiting content.

Go to /dashboard.


For PROD, use deploy variables, not .env.
npm install --production.

