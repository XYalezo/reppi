import nodemailer from 'nodemailer';

type Message = {
  subject: string;
  text: string;
  replyTo: string;
};

type MailerSettings = {
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
  from: string;
  to: string;
};

function readSettings(): MailerSettings | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } = process.env;
  if (!SMTP_HOST || !MAIL_FROM || !MAIL_TO) return null;
  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: SMTP_SECURE === 'true',
    user: SMTP_USER || undefined,
    pass: SMTP_PASS || undefined,
    from: MAIL_FROM,
    to: MAIL_TO,
  };
}

export function mailerConfigured(): boolean {
  return readSettings() !== null;
}

export async function sendEnquiry(message: Message): Promise<void> {
  const settings = readSettings();
  if (!settings) throw new Error('SMTP settings are not configured');
  const transport = nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    auth: settings.user ? { user: settings.user, pass: settings.pass } : undefined,
  });
  await transport.sendMail({
    from: settings.from,
    to: settings.to,
    replyTo: message.replyTo,
    subject: message.subject,
    text: message.text,
  });
}
