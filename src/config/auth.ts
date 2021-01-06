import 'dotenv/config';

export default {
  jwt: {
    secret: process.env.APP_SECRET,
    expires_in: '1h',
  },
};
