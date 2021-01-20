import 'dotenv/config';

interface IMailConfig {
  driver: 'ethereal';
}

export default {
  driver: process.env.MAIL_DRIVER ?? 'ethereal',
} as IMailConfig;
