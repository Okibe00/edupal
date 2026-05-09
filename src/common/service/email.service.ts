import 'dotenv/config';
import { Resend } from 'resend';
import { loginCredentialEmail } from '../template/parentLogin.js';
import { logger } from '../../config/logger.js';

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
}
export class EmailService {
  private readonly mailClient: Resend;
  private readonly defaultFrom: string = 'EduPal <noreply@demo.okibe.space>';
  private readonly defaultText: string = '';
  /**
   * Injects the Resend client into the EmailService.
   * @param mailClient - An instantiated Resend client.
   * @param defaultFrom - The default sender address (e.g., 'Acme <onboarding@resend.dev>')
   */
  constructor(mailClient: Resend) {
    this.mailClient = mailClient;
  }

  /**
   * Sends an email using the injected Resend client.
   */
  async sendEmail(options: SendEmailOptions) {
    const response = await this.mailClient.emails.send({
      from: options.from || this.defaultFrom,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || this.defaultText,
    });

    if (response.error) {
      throw new Error(`Resend Error: ${response.error.message}`);
    }

    return response.data;
  }

  async sendBulkCredentials(
    users: {
      name: string;
      email: string;
      password: string;
      phone: string;
    }[]
  ): Promise<void> {
    const emails = users.map((user) => ({
      from: 'School Portal <noreply@demo.okibe.space>',
      to: user.email,
      subject: 'Your Login Credentials',
      html: loginCredentialEmail(user),
    }));
    const response = await this.mailClient.batch.send(emails);
    if (response.error) {
      throw new Error(`Resend Error: ${response.error.message}`);
    }
  }
}
/**
 * INITIALIZE RESEND
 */
const resend = new Resend(process['env']['RESEND_API_KEY']);
export default new EmailService(resend);
