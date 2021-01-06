import 'dotenv/config';

export default {
  jwt: {
    secret: process.env.APP_SECRET ?? 'api-secret',
    expires_in: '1h',
  },
};
